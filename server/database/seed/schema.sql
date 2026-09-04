DROP TABLE IF EXISTS doctors;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    department_id INTEGER NOT NULL,
    experience_years INTEGER NOT NULL,
    consultation_fee INTEGER NOT NULL,
    phone TEXT,
    email TEXT,
    image TEXT,
    available INTEGER DEFAULT 1,

    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

INSERT INTO departments (name) VALUES
('Cardiology'),
('Dermatology'),
('Emergency'),
('General Medicine'),
('Neurology'),
('Obstetrics & Gynaecology'),
('Oncology'),
('Orthopaedics'),
('Paediatrics'),
('Physiotherapy'),
('Psychiatry'),
('Radiology'),
('Surgery');

INSERT INTO doctors (
    full_name,
    specialty,
    department_id,
    experience_years,
    consultation_fee,
    phone,
    email,
    image
)
VALUES
(
    'Dr. Ibrahim Musa',
    'Cardiologist',
    1,
    15,
    18000,
    '+2348001111111',
    'ibrahim@aurelia.com',
    'dr-ibrahim.jpg'
),
(
    'Dr. Amina Bello',
    'Paediatrician',
    9,
    12,
    15000,
    '+2348002222222',
    'amina@aurelia.com',
    'dr-amina.jpg'
),
(
    'Dr. David Okeke',
    'Neurologist',
    5,
    18,
    22000,
    '+2348003333333',
    'david@aurelia.com',
    'dr-david.jpg'
);