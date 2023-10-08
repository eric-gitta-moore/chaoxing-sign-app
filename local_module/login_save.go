package xxt

import (
	"bufio"
	"fmt"
	"os"
)

func login_save() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter your username: ")
	name, _ := reader.ReadString('\n')

	fmt.Print("Enter your password: ")
	var password string
	fmt.Scanln(&password)

	fmt.Printf("Hello, USER! your usernaem is %s password is %s \n", name, password)
}
