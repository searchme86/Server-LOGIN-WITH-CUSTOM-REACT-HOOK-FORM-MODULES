import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;
