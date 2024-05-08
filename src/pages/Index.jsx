import { useState } from 'react';
import { Container, VStack, Input, Button, List, ListItem, ListIcon, IconButton, Flex, Heading, Box, Text } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <ListIcon as={FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.300'} onClick={() => handleToggleComplete(task.id)} cursor="pointer" />
                <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>{task.text}</Box>
              </Flex>
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
      <Box as="footer" width="full" p={4} borderTop="1px" borderColor="gray.200">
        <Flex justify="space-between" align="center">
          <Text fontSize="sm">&copy; 2023 Todo App</Text>
          <Text fontSize="sm">More links coming soon...</Text>
        </Flex>
      </Box>
    </Container>
  );
};

export default Index;