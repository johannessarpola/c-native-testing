const { execSync, spawn } = require('child_process');

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

// Function to run the CLI application and capture the output
function runCLI(args) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(`${mainCommand}`, args);

    let output = '';

    // Capture stdout data
    childProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    // When the process ends, resolve the promise with the output
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve(output.trim());
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    // Pipe the process's stdin to the real stdin so that it can receive user input
    process.stdin.pipe(childProcess.stdin);
  });
}

// Example Jest test
describe('Interactive CLI test', () => {
  let mockStdin;
  let mockStdout;

  beforeAll(() => {
    // Mock stdin and stdout
    mockStdin = require('mock-stdin').stdin();
    mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation();
  });

  afterAll(() => {
    // Restore the original stdin and stdout
    mockStdin.restore();
    mockStdout.mockRestore();
  });

  test('Reverses the input string', async () => {
    const input = 'Hello';
    const expectedOutput = 'Enter a string to reverse:\nolleH';

    // Start the CLI application (assumes it's listening for user input)
    const cliPromise = runCLI([]);

    // Send the user input
    mockStdin.send(`${input}\n`);

    // Wait for the application to finish processing
    const actualOutput = await cliPromise;

    // Assert that the output matches the expected output
    expect(actualOutput).toContain(expectedOutput);
  });
});
