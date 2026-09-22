import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { addQuizes } from '../../../../api/adminApiFunctions/addQuizeApi/addQuizeApi';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-toastify';

function AddQustions() {
  const { quizId } = useParams(); // ✅ Get quizId from URL
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      courseId: quizId, // ✅ set as courseId in payload
      title: data.title,
    };

    for (let i = 1; i <= 10; i++) {
      payload[`text_${i}`] = data[`text_${i}`];
      payload[`options_${i}`] = JSON.stringify([
        data[`option1_${i}`],
        data[`option2_${i}`],
        data[`option3_${i}`],
        data[`option4_${i}`],
      ]);
      payload[`correctAnswerIndex_${i}`] = data[`correctAnswerIndex_${i}`];
    }

    const response = await addQuizes(payload);
    if (response?.status === 200 || response?.data?.success) {
      toast.success("Quiz added successfully!");
      reset();
    } else {
      toast.error("Failed to add quiz");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Add Quiz Questions
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <TextField
            label="Quiz Title"
            fullWidth
            margin="normal"
            {...register('title', { required: true })}
          />
        </Paper>

        {[...Array(10)].map((_, index) => {
          const i = index + 1;
          return (
            <Paper key={i} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Question {i}</Typography>
              <TextField
                label={`Question ${i} Text`}
                fullWidth
                margin="normal"
                {...register(`text_${i}`, { required: true })}
              />
              <TextField
                label="Option 1"
                fullWidth
                margin="normal"
                {...register(`option1_${i}`, { required: true })}
              />
              <TextField
                label="Option 2"
                fullWidth
                margin="normal"
                {...register(`option2_${i}`, { required: true })}
              />
              <TextField
                label="Option 3"
                fullWidth
                margin="normal"
                {...register(`option3_${i}`, { required: true })}
              />
              <TextField
                label="Option 4"
                fullWidth
                margin="normal"
                {...register(`option4_${i}`, { required: true })}
              />
              <TextField
                label="Correct Answer Index (0-3)"
                type="number"
                fullWidth
                margin="normal"
                inputProps={{ min: 0, max: 3 }}
                {...register(`correctAnswerIndex_${i}`, { required: true })}
              />
            </Paper>
          );
        })}

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Quiz
        </Button>
      </form>
    </Box>
  );
}

export default AddQustions;
