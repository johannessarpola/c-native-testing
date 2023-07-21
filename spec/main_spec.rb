describe 'reverter' do
    before do
      `rm -rf main && gcc -o main main.c`
    end
    
    def run_args(args)
      raw_output = nil
      IO.popen(["./main"] + args, "r+") do |pipe| 
        # Read entire output
        raw_output = pipe.gets(nil)
      end
      raw_output.split("\n")
    end
    def run_script(commands)
      raw_output = nil
      IO.popen("./main", "r+") do |pipe|
        commands.each do |command|
          begin
            pipe.puts command
          rescue Errno::EPIPE
            break
          end
        end
  
        pipe.close_write
  
        # Read entire output
        raw_output = pipe.gets(nil)
      end
      raw_output.split("\n")
    end
  
    it 'reverts a string with args' do 
      result = run_args([
        "hello"
      ])
      expect(result).to match_array([
        "Original string: hello",
        "Reversed string: olleh"
      ])
    end
    it 'reverts a string in interactive' do
      result = run_script([
        "hello"
      ])
      expect(result).to match_array([
        "Enter a string to reverse:",
        "Original string: hello",
        "Reversed string: olleh"
      ])
    end
  end