const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    habit: {
        type: String,
        required:true
    },
    repeat: {
        type: [Array],
        required:true
    },
    days: {
        type: String,
        required:true
    },
    time: {
        type: String,
        required:true
    },
    currentStreak: {
        type:Number,
        required:true
    },
    longestStreak: {
        type:Number,
        required:true
    },
    currentWeek: {
        type: String
    }
});

const Habit = mongoose.model('Task',habitSchema);

module.exports=Habit;