DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
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