const mysql = require('mysql');

// Create connection to MySQL server
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  multipleStatements: true // Allows multiple SQL statements in one query
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
  
  // Step 1: Create Database
  db.query('CREATE DATABASE IF NOT EXISTS school_db', (err, result) => {
    if (err) throw err;
    console.log('Database created or exists already.');
    
    // Use the newly created database
    db.query('USE school_db', (err, result) => {
      if (err) throw err;
      console.log('Using school_db database.');
      
      // Step 2: Create Tables
      const createTables = `
        -- Departments Table
        CREATE TABLE IF NOT EXISTS departments (
          department_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          head_of_department VARCHAR(100)
        );

        -- Classrooms Table
        CREATE TABLE IF NOT EXISTS classrooms (
          classroom_id INT AUTO_INCREMENT PRIMARY KEY,
          room_number VARCHAR(10) NOT NULL,
          capacity INT
        );

        -- Students Table
        CREATE TABLE IF NOT EXISTS students (
          student_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          date_of_birth DATE,
          address VARCHAR(255),
          phone VARCHAR(15),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS teachers (
          teacher_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          department_id INT,
          FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
        );

        -- Courses Table
        CREATE TABLE IF NOT EXISTS courses (
          course_id INT AUTO_INCREMENT PRIMARY KEY,
          course_name VARCHAR(100) NOT NULL,
          course_code VARCHAR(10) UNIQUE,
          credit_hours INT,
          department_id INT,
          teacher_id INT,
          FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL,
          FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL
        );

        -- Subjects Table
        CREATE TABLE IF NOT EXISTS subjects (
          subject_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT
        );

        -- Course-Subject Relationship Table
        CREATE TABLE IF NOT EXISTS course_subject (
          course_id INT,
          subject_id INT,
          PRIMARY KEY (course_id, subject_id),
          FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
          FOREIGN KEY (subject_id) REFERENCES subjects(subject_id) ON DELETE CASCADE
        );

        -- Classes Table
        CREATE TABLE IF NOT EXISTS classes (
          class_id INT AUTO_INCREMENT PRIMARY KEY,
          class_name VARCHAR(50) NOT NULL,
          teacher_id INT,
          classroom_id INT,
          FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL,
          FOREIGN KEY (classroom_id) REFERENCES classrooms(classroom_id) ON DELETE SET NULL
        );

        -- Schedules Table
        CREATE TABLE IF NOT EXISTS schedules (
          schedule_id INT AUTO_INCREMENT PRIMARY KEY,
          class_id INT,
          start_time TIME,
          end_time TIME,
          day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
          FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE
        );

        -- Enrollments Table
        CREATE TABLE IF NOT EXISTS enrollments (
          enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT,
          course_id INT,
          enrollment_date DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
          FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
        );

        -- Attendance Records Table
        CREATE TABLE IF NOT EXISTS attendance_records (
          record_id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT,
          class_id INT,
          date DATE,
          status ENUM('Present', 'Absent', 'Excused'),
          FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
          FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE CASCADE
        );

        -- Grades Table
        CREATE TABLE IF NOT EXISTS grades (
          grade_id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT,
          course_id INT,
          grade CHAR(1),
          grade_date DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
          FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE
        );

        -- Salaries Table for School Employees
        CREATE TABLE IF NOT EXISTS salaries (
          salary_id INT AUTO_INCREMENT PRIMARY KEY,
          employee_id INT,
          employee_role ENUM('Teacher', 'Administrator', 'Staff') NOT NULL,
          salary_amount DECIMAL(10, 2) NOT NULL,
          payment_date DATE DEFAULT CURRENT_DATE,
          FOREIGN KEY (employee_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
        );

        -- Student Fees Payment Table
        CREATE TABLE IF NOT EXISTS student_fees (
          fee_id INT AUTO_INCREMENT PRIMARY KEY,
          student_id INT,
          amount DECIMAL(10, 2) NOT NULL,
          payment_date DATE DEFAULT CURRENT_DATE,
          status ENUM('Paid', 'Pending', 'Overdue') NOT NULL,
          FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
        );
      `;
      
      // Execute the table creation queries
      db.query(createTables, (err, result) => {
        if (err) throw err;
        console.log('Tables created successfully.');
        
        // Close the database connection
        db.end((err) => {
          if (err) throw err;
          console.log('Disconnected from MySQL.');
        });
      });
    });
  });
});
