const { execSync } = require('child_process');

// Assuming your native application is named 'main' and takes input from command line arguments
const mainCommand = './main'; // Replace 'path/to/main' with the actual path to your 'main' application

test('Reverses a basic string', () => {
  const input = 'hello';
  const output = execSync(`${mainCommand} ${input}`).toString().trim();
  expect(output).toBe('olleh');
});

test('Reverses a long string', () => {
  const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const output = execSync(`${mainCommand} "${input}"`).toString().trim();
  expect(output).toBe('.tile gnicsipida rutetcesnoc ,tema tis rolod muspi meroL');
});

