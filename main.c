#include <stdio.h>
#include <string.h>

void reverseString(char *str) {
    int len = strlen(str);
    for (int i = len - 1; i >= 0; i--) {
        printf("%c", str[i]);
    }

    printf("\n");
}

int main(int argc, char *argv[]) {
    if (argc == 2) {
        // If a command-line argument is provided, reverse it.
        reverseString(argv[1]);
    } else {
        // If no command-line argument is provided, read from stdin.
        char input_string[1000];
        printf("Enter a string to reverse:\n");
        if (fgets(input_string, sizeof(input_string), stdin) != NULL) {
            // Replace the trailing newline character with null terminator.
            int len = strlen(input_string);
            if (len > 0 && input_string[len - 1] == '\n') {
                input_string[len - 1] = '\0';
            }
            reverseString(input_string);
        } else {
            printf("Error reading input.\n");
        }
    }

    return 0;
}
