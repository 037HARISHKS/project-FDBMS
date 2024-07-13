const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload  = require('../config/multerConfig');

console.log('Importing upload:', upload);

const Faculty = require('../models/Faculty');



// Create a new faculty
router.post('/register', upload.single('photoId'), async (req, res) => {
  const {
    name, empId, dob, experience, password, email, phone, address,
    educationalBackground, subjectsHandled, certifications,
    internships, publications, awards, projectsHandled,
    fundedProjectProposals, patents, books, fdpsAttended, consultancies
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if a file was uploaded
    let photoIdPath = null;
    if (req.file) {
      photoIdPath = req.file.path; 
    }

    const newFaculty = new Faculty({
      name,
      empId,
      dob,
      experience,
      password: hashedPassword,
      email,
      phone,
      address,
      educationalBackground,
      photoId: photoIdPath,
      subjectsHandled,
      certifications,
      internships,
      publications,
      awards,
      projectsHandled,
      fundedProjectProposals,
      patents,
      books,
      fdpsAttended,
      consultancies
    });

    await newFaculty.save();
    res.status(201).send('Faculty registered');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering faculty');
  }
});


//authenticate

router.post('/login', async (req, res) => {
  console.log('Request body:', req.body);
  const { email, password } = req.body;

  try {
    console.log(`Checking user with email: ${email}`);
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      console.log("User not found!");
      return res.status(400).send('Faculty not found');
    }

    console.log(`User found: ${JSON.stringify(faculty)}`);
    if (!faculty.password) {
      console.error("User password is undefined");
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log(`Comparing passwords: input password: ${password}, stored password: ${faculty.password}`);
    const isMatch = await bcrypt.compare(password, faculty.password);

    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    const token = jwt.sign({ id: faculty._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    res.status(200).cookie('token', token, { httpOnly: true }).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Protected dashboard route


// Route to fetch faculty details for dashboard
router.get('/dashboard', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).send('Access denied');
  }

  try {
      const verified = jwt.verify(token,process.env.KEY);
      req.user = verified;
      res.json(verified);
  } catch (error) {
      res.status(400).send('Invalid token');
  }
});

// Read all faculty
router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single faculty by ID
router.get('/faculty/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).send();
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a faculty by ID
router.put('/faculty/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faculty) return res.status(404).send();
    res.status(200).send(faculty);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a faculty by ID
router.delete('/faculty/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).send();
    res.status(200).send(faculty);
  } catch (error) {
    res.status(500).send(error);
  }
});


//-------------------------------------------------------------SUBJECT----------------------------------------------------------------------------

// Add a subject
router.post('/update-subject-percentage', async (req, res) => {
  const { empId, subjectName, courseCode, examType, percentage } = req.body;

  try {
      // Find the faculty by empId
      let faculty = await Faculty.findOne({ empId });

      if (!faculty) {
          return res.status(404).json({ message: 'Faculty not found' });
      }

      // Find the subject
      let subject = faculty.subjectsHandled.find(sub => sub.name === subjectName && sub.coursecode === courseCode);

      if (!subject) {
          // If the subject does not exist, create a new subject
          subject = {
              name: subjectName,
              coursecode: courseCode,
              internalPassPercentages: []
          };
          faculty.subjectsHandled.push(subject);
      }

      // Find the examType in the subject's internalPassPercentages array
      let passPercentage = subject.internalPassPercentages.find(pass => pass.examType === examType);

      if (passPercentage) {
          // If the examType exists, update the percentage
          passPercentage.percentage = percentage;
      } else {
          // If the examType does not exist, add a new entry
          subject.internalPassPercentages.push({ examType, percentage });
      }

      // Save the updated faculty document
      await faculty.save();

      res.json(faculty);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});
  // Get all subjects
  router.get('/faculty/:id/subjects', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.subjectsHandled);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a subject
  router.delete('/faculty/:id/subjects/:subjectId', async (req, res) => {
    const facultyId = req.params.id;
    const subjectId = req.params.subjectId;

    try {
        const faculty = await Faculty.findById(facultyId);
        if (!faculty) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        faculty.subjectsHandled = faculty.subjectsHandled.filter(subject => subject._id != subjectId);
        await faculty.save();

        res.status(200).json(faculty.subjectsHandled);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//------------------------------------------------PUBLICATIONS-------------------------------------------------------------------------------------  
  
// Add a publication
router.post('/faculty/add-publication', upload.single('file'), async (req, res) => {
  try {
    const { empId, title, category, type, date, description } = req.body;
    const file = req.file;

    const faculty = await Faculty.findOne({ empId });
    if (!faculty) {
      return res.status(404).send('Faculty not found');
    }

    const newPublication = {
      title,
      category,
      type,
      date,
      description,
      fileId: file.filename
    };

    faculty.publications.push(newPublication);
    await faculty.save();

    res.status(200).json(faculty); // Send back the updated faculty record
  } catch (error) {
    res.status(500).send('Server error');
  }
});


  // Get all publications
  router.get('/faculty/:id/publications', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.publications);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a publication
  router.delete('/faculty/:id/publications/:publicationId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const publication = faculty.publications.id(req.params.publicationId);
      if (publication) {
        await gfs.remove({ _id: publication.fileId, root: 'uploads' });
        publication.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//-------------------------------------------------CERTIFICATIONS----------------------------------------------------------------------------------

// Add a certification
router.post('/uploadcertificate', upload.single('upload'), async (req, res) => {
  const { empId, nameofcer, Describecertificate, Duration } = req.body;

  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  try {
      const faculty = await Faculty.findOne({ empId });
      if (!faculty) {
          return res.status(404).send('User not found.');
      }
      console.log(`faculty found ${faculty}`);

      const newCertificate = {
          name: nameofcer,
          description: Describecertificate,
          duration: Duration,
          fileId: req.file.filename
      };

      faculty.certifications.push(newCertificate);
      await faculty.save();

      res.status(200).send('Certificate added successfully.');
  } catch (error) {
      res.status(500).send('Server error.');
  }
});

  
  // Get all certifications
  router.get('/faculty/:id/certifications', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.certifications);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a certification
  router.delete('/faculty/:id/certifications/:certificationId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const certification = faculty.certifications.id(req.params.certificationId);
      if (certification) {
        await gfs.remove({ _id: certification.fileId, root: 'uploads' });
        certification.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//-----------------------------------------------------AWARDS--------------------------------------------------------------------------------------

// Add an award
router.post('/uploadaward', upload.single('awardImage'), async (req, res) => {
  const { empId, awardName, organization, date } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const faculty = await Faculty.findOne({ empId });
    if (!faculty) {
      return res.status(404).send('User not found.');
    }
    console.log(`Faculty found: ${faculty}`);

    const newAward = {
      name: awardName,
      issuer: organization,
      date: date,
      fileId: req.file.filename
    };

    faculty.awards.push(newAward);
    await faculty.save();

    res.status(200).json(faculty); 
  } catch (error) {
    console.error('Error during award upload:', error);
    res.status(500).send('Server error.');
  }
});
  
  // Get all awards
  router.get('/faculty/:id/awards', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.awards);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete an award
  router.delete('/faculty/:id/awards/:awardId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      faculty.awards.id(req.params.awardId).remove();
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//---------------------------------------------PROJECTS_HANDLED------------------------------------------------------------------------------------

// Add a project
router.post('/faculty/:id/projects', upload.single('pdf'), async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const project = { ...req.body, fileId: req.file.id };
      faculty.projectsHandled.push(project);
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Get all projects
  router.get('/faculty/:id/projects', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.projectsHandled);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a project
  router.delete('/faculty/:id/projects/:projectId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const project = faculty.projectsHandled.id(req.params.projectId);
      if (project) {
        await gfs.remove({ _id: project.fileId, root: 'uploads' });
        project.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

//----------------------------------------------FUNDED_PROJECT--------------------------------------------------------------------------------------

// Add a funded project proposal
router.post('/faculty/add-fpp', upload.single('file'), async (req, res) => {
  try {
    const { empId, title, status, dateSubmitted, dateReviewed, description } = req.body;
    const file = req.file;

    const faculty = await Faculty.findOne({ empId });
    if (!faculty) {
      return res.status(404).send('Faculty not found');
    }

    const newFPP = {
      title,
      status,
      dateSubmitted,
      dateReviewed,
      description,
      fileId: file.filename
    };

    faculty.fundedProjectProposals.push(newFPP);
    await faculty.save();

    res.status(200).json(faculty); // Send back the updated faculty record
  } catch (error) {
    res.status(500).send('Server error');
  }
});
  

  
  // Delete a funded project proposal
  router.delete('/faculty/:id/funded-project-proposals/:proposalId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      faculty.fundedProjectProposals.id(req.params.proposalId).remove();
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//----------------------------------------------------------PATENTS----------------------------------------------------------------------------------

// Add a patent
router.post('/faculty/add-patent', upload.single('pdf'), async (req, res) => {
  try {
    const { empId, patentNo, patentTitle, patentDescription, dateOfPublishing } = req.body;
    const file = req.file;

    const faculty = await Faculty.findOne({ empId });
    if (!faculty) {
      return res.status(404).send('Faculty not found');
    }

    const newPatent = {
      p_no : patentNo,
      title: patentTitle,
      description: patentDescription,
      dop: new Date(dateOfPublishing),
      fileId: file.filename
    };

    faculty.patents.push(newPatent);
    await faculty.save();

    res.status(200).json(faculty); // Send back the updated faculty record
  } catch (error) {
    res.status(500).send('Server error');
  }
});
  
  // Get all patents
  router.get('/faculty/:id/patents', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.patents);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a patent
  router.delete('/faculty/:id/patents/:patentId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const patent = faculty.patents.id(req.params.patentId);
      if (patent) {
        await gfs.remove({ _id: patent.fileId, root: 'uploads' });
        patent.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//------------------------------------------------------BOOKS------------------------------------------------------------------------------

// Add a book
router.post('/uploadbook', upload.single('pdf'), async (req, res) => {
  const { academicYear, title, author, description, ISBN, empId } = req.body;
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const faculty = await Faculty.findOne({empId });
    if (!faculty) {
      return res.status(404).send('User not found.');
    }
    console.log(`Faculty found: ${faculty}`);

    const newBook = {
      academicYear: academicYear,
      title: title,
      author: author,
      description: description,
      ISBN: ISBN,
      fileId: req.file.filename
    };

    faculty.books.push(newBook);
    await faculty.save();

    res.status(200).json(faculty);
  } catch (error) {
    console.error('Error during book upload:', error);
    res.status(500).send('Server error.');
  }
});
  
  // Get all books
  router.get('/faculty/:id/books', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.books);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a book
  router.delete('/faculty/:id/books/:bookId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      faculty.books.id(req.params.bookId).remove();
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//------------------------------------------------------FDP---------------------------------------------------------------------------------------

// Add an FDP
router.post('/faculty/:id/fdp', upload.single('pdf'), async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const fdp = { ...req.body, fileId: req.file.id };
      faculty.fdp.push(fdp);
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Get all FDPs
  router.get('/faculty/:id/fdp', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.fdp);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete an FDP
  router.delete('/faculty/:id/fdp/:fdpId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const fdp = faculty.fdp.id(req.params.fdpId);
      if (fdp) {
        await gfs.remove({ _id: fdp.fileId, root: 'uploads' });
        fdp.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

  
//-------------------------------------------------CONSULTANCY -----------------------------------------------------------------------------------

// Add a consultancy
router.post('/faculty/:id/consultancy', upload.single('pdf'), async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const consultancy = { ...req.body, fileId: req.file.id };
      faculty.consultancy.push(consultancy);
      await faculty.save();
      res.status(200).send(faculty);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Get all consultancy
  router.get('/faculty/:id/consultancy', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      res.status(200).send(faculty.consultancy);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete a consultancy
  router.delete('/faculty/:id/consultancy/:consultancyId', async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id);
      if (!faculty) return res.status(404).send();
      const consultancy = faculty.consultancy.id(req.params.consultancyId);
      if (consultancy) {
        await gfs.remove({ _id: consultancy.fileId, root: 'uploads' });
        consultancy.remove();
        await faculty.save();
        res.status(200).send(faculty);
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
module.exports = router;