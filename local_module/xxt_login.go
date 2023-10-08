package xxt

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/cookiejar"
	"net/url"
)

func xxt_login() {
	// 创建cookie jar
	jar, _ := cookiejar.New(nil)

	// 创建http客户端
	client := &http.Client{
		Jar: jar,
	}

	// 构造登录请求
	loginUrl := "https://passport2.chaoxing.com/fanyalogin"
	data := url.Values{}
	data.Set("uname", "")
	data.Set("password", "")
	data.Set("refer", "http://i.mooc.chaoxing.com")
	data.Set("t", "true")
	req, err := http.NewRequest("POST", loginUrl, bytes.NewBufferString(data.Encode()))
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// 发送登录请求
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	// 打印登录响应
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println("Login Response Body:", string(body))

	// 打印cookies
	fmt.Println("Cookies:", jar.Cookies(req.URL))
}
