package xxt

import (
	"fmt"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"time"
)

var (
	loginURL       = "https://passport2.chaoxing.com/fanyalogin"
	cookieFilePath = "/cookies/cookies.txt"
)

func main() {
	// 创建一个cookie jar对象来管理cookies
	jar, err := cookiejar.New(&cookiejar.Options{Filename: cookieFilePath})
	if err != nil {
		fmt.Println("Failed to create cookie jar:", err)
		return
	}

	// 创建一个HTTP客户端，并设置cookie jar
	client := http.Client{Jar: jar}

	// 定义一个定时器，每隔一段时间执行一次更新认证信息的逻辑
	timer := time.NewTicker(24 * time.Hour) // 每隔24小时执行一次
	for range timer.C {
		err := loginAndRefresh(client)
		if err != nil {
			fmt.Println("Failed to login and refresh:", err)
		}
	}
}

func loginAndRefresh(client http.Client) error {
	// 发送登录请求
	err := login(client)
	if err != nil {
		return err
	}

	// 发送刷新请求

	return err
}

func login(client http.Client) error {
	//// 构造登录请求的参数
	data := url.Values{}
	data.Set("username", "your_username")
	data.Set("password", "your_password")

	//// 发送POST请求
	resp, err := client.PostForm(loginURL, data)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	//// 检查登录是否成功
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Login failed with status code: %d", resp.StatusCode)
	}

	//// 登录成功
	fmt.Println("Logged in successfully")

	return nil
}

//// 刷新成功
