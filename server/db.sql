CREATE DATABASE project4;

CREATE TABLE employee_master(
 
        eid SERIAL PRIMARY KEY,
       emp_id VARCHAR(100),
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255) NOT NULL,
        gender VARCHAR(25) NOT NULL,
        dob DATE NOT NULL,
        resaddress1 TEXT,
        resaddress2 TEXT,
        respincode INT NOT NULL,
        rescity TEXT,
        resstate TEXT,
        rescountry TEXT,
        offphone VARCHAR(20) NOT NULL,
        homephone VARCHAR(20),
        mobile1 VARCHAR(20) NOT NULL,
        mobile2 VARCHAR(20),
        email VARCHAR(100) NOT NULL,
        department TEXT NOT NULL,
        officeaddress TEXT NOT NULL,
        branch TEXT NOT NULL,
        offcity TEXT NOT NULL,
        offstate TEXT NOT NULL,
        offpincode INT NOT NULL,
        offcountry TEXT NOT NULL
);
ALTER TABLE employee_master
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_master(user_id);

ALTER TABLE employee_master
ADD COLUMN password VARCHAR(255);





CREATE TABLE user_master(
   user_id SERIAL PRIMARY KEY,
   fname VARCHAR(255) NOT NULL,
   lname VARCHAR(255) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL

);
CREATE TABLE salary_master(
        salary_id SERIAL,
        emp_id  VARCHAR(100)  PRIMARY KEY,
        basicsalary NUMERIC(8,2) NOT NULL,
        grade VARCHAR(25) NOT NULL,
        hra NUMERIC(8,2) NOT NULL,
        ca NUMERIC(8,2) NOT NULL,
        pa NUMERIC(8,2) NOT NULL,
        fa NUMERIC(8,2) NOT NULL,
        hi NUMERIC(8,2) NOT NULL,
        pf NUMERIC(8,2) NOT NULL,
        professionaltax INT NOT NULL,
        grossSalary NUMERIC(8,2) NOT NULL,
        netSalary NUMERIC(8,2) NOT NULL
       );
       ALTER TABLE salary_master
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_master(user_id);
       
  CREATE TABLE attendance_master(
    attendance_id SERIAL ,
    emp_id  VARCHAR(100) PRIMARY KEY NOT NULL,
    month TEXT NOT NULL,
    present INT NOT NULL,
    absent INT NOT NULL
  );
   ALTER TABLE attendance_master
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES user_master(user_id);
      




  CREATE TABLE salary_details(
    sal_id SERIAL PRIMARY KEY,
    emp_id VARCHAR(100) NOT NULL,
    oneDaySalary NUMERIC(8,2),
    salary NUMERIC(8,2),
    month TEXT

  );
  SELECT e.emp_id, s.netsalary, a.present
FROM employee_master as e
JOIN salary_master as s ON e.emp_id = s.emp_id
JOIN attendance_master AS a ON e.emp_id = a.emp_id
WHERE e.emp_id = ' tcs679031579542 ';
"SELECT e.emp_id, s.netsalary, a.present FROM employee_master as e JOIN salary_master as s ON e.emp_id =s.emp_id   JOIN attendance_master AS a ON s.emp_id = a.emp_id "