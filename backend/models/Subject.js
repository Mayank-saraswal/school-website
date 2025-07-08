import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  class: {
    type: String,
    required: [true, 'Class is required'],
    enum: {
      values: [
        'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4',
        'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
        'Class 11 Science', 'Class 11 Arts', 'Class 11 Commerce',
        'Class 12 Science', 'Class 12 Arts', 'Class 12 Commerce'
      ],
      message: 'Please select a valid class'
    }
  },
  medium: {
    type: String,
    required: [true, 'Medium is required'],
    enum: {
      values: ['English', 'Hindi'],
      message: 'Medium must be either English or Hindi'
    }
  },
  subjects: [{
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      uppercase: true,
      trim: true
    },
    isOptional: {
      type: Boolean,
      default: false
    },
    maxMarks: {
      type: Number,
      default: 100,
      min: [1, 'Maximum marks must be at least 1']
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  academicYear: {
    type: String,
    default: function() {
      return new Date().getFullYear().toString();
    }
  },
  createdBy: {
    type: String,
    default: 'Admin'
  },
  lastUpdatedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Compound index to ensure unique class-medium combination
subjectSchema.index({ class: 1, medium: 1, academicYear: 1 }, { unique: true });

// Regular indexes for performance
subjectSchema.index({ class: 1 });
subjectSchema.index({ medium: 1 });
subjectSchema.index({ isActive: 1 });

// Static method to get subjects for a specific class and medium
subjectSchema.statics.getSubjectsForClass = async function(className, medium, academicYear = null) {
  const query = {
    class: className,
    medium: medium,
    isActive: true
  };
  
  if (academicYear) {
    query.academicYear = academicYear;
  }
  
  const result = await this.findOne(query);
  return result ? result.subjects : [];
};

// Static method to get all subjects by medium
subjectSchema.statics.getSubjectsByMedium = async function(medium, academicYear = null) {
  const query = {
    medium: medium,
    isActive: true
  };
  
  if (academicYear) {
    query.academicYear = academicYear;
  }
  
  return await this.find(query).sort({ class: 1 });
};

// Pre-save middleware to validate subjects
subjectSchema.pre('save', function(next) {
  // Ensure subject codes are unique within the same class-medium
  const codes = this.subjects.map(subject => subject.code);
  const uniqueCodes = [...new Set(codes)];
  
  if (codes.length !== uniqueCodes.length) {
    return next(new Error('Subject codes must be unique within the same class'));
  }
  
  next();
});

const Subject = mongoose.model('Subject', subjectSchema);

export default Subject; 