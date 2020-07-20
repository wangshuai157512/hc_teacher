##教师资格证接口文档

###一、 说明

---

教师资格证项目分为管理端和客户端，管理端供学程教育客服人员使用，客户端即为小程序端，以下接口包含小程序所需接口和部分管理端接口。

###二、 接口

---

**1\. 登录验证**
###### 接口功能
> 获取小程序的登录信息（openId）

###### URL
> [https://www.pmhuai.top/wx/api/app_login/teacherLogin]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| code		| true		| string	| 小程序的登录code|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|msg	  |string 	|返回用户信息                     |
	|data	  |object 	|返回用户信息         	        |
	|avatarUrl|string	|用户头像						|
	|isShare  |int		|是否分享过精讲课程				|
	|isShareCourse|int	|是否分享过正价课程课程			|
	|openId	  |string	|用户openId						|
	|phone	  |string	|用户手机号						|
	|realName |string	|真实姓名						|
	|token	  |string	|用户token						|
	|user	  |string	|用户昵称						|

###### 接口示例
> 示例：
> 
	{
		success:true,
		msg:'用户信息',
		data:{
				avatarUrl:'https://wx.qlogo/.cn',
				id:30,
				isShare:0,
				isShareCourse:1,
				openId:"oM1bX5XhcQ0UlWKloIFBN3ylVk40",
				phone:'18734718382'，
				realName:'裴梦槐',
				token:"token_73acb24b-ce5c-4a23-8b8a-f594614ed8f4",
				user:"裴梦槐"
			}
	}

**2\. 授权登录**
###### 接口功能
> 更新小程序的用户信息（token、nickName、avatarUrl）

> 如果有推荐人，更新推荐人信息

###### URL
> [https://www.pmhuai.top/wx/api/app_login/teacherLoginAuth]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| code		| true		| string	| 小程序的登录code|
	|encryptedData|true		| string    | 客户端获取的敏感信息  |
	|iv			| true		| string    | 客户端获取的初始向量  |

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|msg	  |string 	|返回授权成功                     |
	|data	  |object 	|返回用户信息         	        |
	|avatarUrl|string	|用户头像						|
	|isShare  |int	|是否分享过精讲课程				|
	|isShareCourse|int|是否分享过正价课程课程			|
	|openId	  |string	|用户openId						|
	|token	  |string	|用户token						|
	|user	  |string	|用户昵称						|

###### 接口示例
> 示例：
> 
	{
		success:true,
		msg:'授权成功',
		data:{
				avatarUrl:'https://wx.qlogo/.cn',
				id:30,
				isShare:0,
				isShareCourse:1,
				openId:"oM1bX5XhcQ0UlWKloIFBN3ylVk40",
				token:"token_73acb24b-ce5c-4a23-8b8a-f594614ed8f4",
				user:"裴梦槐"
			}
	}

**3\. 获取最新用户信息(弹窗、最新进度条需要)**
###### 接口功能
> 获取最新用户信息(弹窗、最新进度条需要)

###### URL
> [https://www.pmhuai.top/wx/api/app_login/getMsg]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 小程序的登录code|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|user	  |object 	|返回用户信息         	        |
	|avatarUrl|string	|用户头像						|
	|isShare  |int	|是否分享过精讲课程				|
	|isShareCourse|int|是否分享过正价课程课程			|
	|openId	  |string	|用户openId						|
	|token	  |string	|用户token						|
	|user	  |string	|用户昵称						|

###### 接口示例
> 示例：
> 
	{
		success:true,
		user:{
				avatarUrl:'https://wx.qlogo/.cn',
				id:30,
				isShare:0,
				isShareCourse:1,
				openId:"oM1bX5XhcQ0UlWKloIFBN3ylVk40",
				token:"token_73acb24b-ce5c-4a23-8b8a-f594614ed8f4",
				user:"裴梦槐"
			}
	}

**4\. 查询课程信息**
###### 接口功能
> 查询课程信息

###### URL
> [https://www.pmhuai.top/wx/api/app_teacherCourse/get]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| page		| true		| int		| 页数		|
	| limit		| true		| int		| 每页显示条数 |
	| isPositivePrice	| true		| int	| 课程类型：0：精讲课；1：正价课|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|course	  |object 	|返回课程信息         	        |
	|id	  	  |int	 	|课程id		         	        |
	|imgUrl	  |string	|封面图							|
	|isDel	  |int		|是否删除？0：未删除；1：已删除		|
	|isPositivePrice|int|是否属于正价课？0：不属于；1：属于	|
	|oldPrice |int		|课程原价						|
	|price	  |int		|课程现价						|
	|suitablePerson	|int|适合人群：0：幼儿；1：小学；2：中学|
	|tem1	  |string   |								|
	|tem2	  |string   |								|
	|tem3	  |string   |								|
	|title	  |string   |标题							|
	|type	  |int 	    |类型：0：精讲；1：面试；2：笔试；3：面试+笔试|
	|videoUrl |string   |视频腾讯云地址					|
	|total	  |int   	|课程总数						|

###### 接口示例
> 示例：
> 
	{
		success:true,
		course:{
				imgUrl:'https://wx.qlogo/.cn',
				id:30,
				isDel:0,
				isPositivePrice:1,
				oldPrice:3800,
				price:1200,
				suitablePerson:1,
				tem1:"/wx/uploads/images/1552894157349-12375.png",
				tem2:"/wx/uploads/images/1552894157349-12375.png",
				tem3:"/wx/uploads/images/1552894157349-12375.png",
				title:"零基础协议取证班",
				type:1,
				videoUrl:"https://v.qq.com/x/page/x0850c48bo0.html",
			},
		total:1,
	}

**5\. 查询课程详细信息**
###### 接口功能
> 查询课程详细信息

###### URL
> [https://www.pmhuai.top/wx/api/app_teacherCourse/look]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 课程id		|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|course	  |object 	|返回课程信息         	        |
	|imgUrl	  |string	|封面图							|
	|isDel	  |int		|是否删除？0：未删除；1：已删除		|
	|isPositivePrice|int|是否属于正价课？0：不属于；1：属于	|
	|oldPrice |int		|课程原价						|
	|price	  |int		|课程现价						|
	|suitablePerson	|int|适合人群：0：幼儿；1：小学；2：中学|
	|tem1	  |string   |								|
	|tem2	  |string   |								|
	|tem3	  |string   |								|
	|title	  |string   |标题							|
	|type	  |int 	    |类型：0：精讲；1：面试；2：笔试；3：面试+笔试|
	|videoUrl |string   |视频腾讯云地址					|

###### 接口示例
> 示例：
> 
	{
		success:true,
		course:{
				imgUrl:'https://wx.qlogo/.cn',
				id:30,
				isDel:0,
				isPositivePrice:1,
				oldPrice:3800,
				price:1200,
				suitablePerson:1,
				tem1:"/wx/uploads/images/1552894157349-12375.png",
				tem2:"/wx/uploads/images/1552894157349-12375.png",
				tem3:"/wx/uploads/images/1552894157349-12375.png",
				title:"零基础协议取证班",
				type:1,
				videoUrl:"https://v.qq.com/x/page/x0850c48bo0.html",
			},
	}

**6\. 查询订单信息**
###### 接口功能
> 查询订单信息

###### URL
> [https://www.pmhuai.top/wx/api/app_order/get]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 用户id		|
	| type		| true		| int		| 状态：0：未支付；1：已支付；2：已删除|
	| page		| true		| int		| 页数		|
	| limit		| true		| int		| 每页显示条数 |

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|course	  |object 	|返回订单信息         	        |
	|imgUrl	  |string	|订单课程封面图					|
	|price	  |int		|订单课程现价						|
	|suitablePerson	|int|订单课程适合人群：0：幼儿；1：小学；2：中学|
	|title	  |string   |订单课程标题						|
	|type	  |int 	    |订单课程类型：0：精讲；1：面试；2：笔试；3：面试+笔试|
	|user	  |string   |昵称					|
	|merchOrderId|int	|订单编号				|

###### 接口示例
> 示例：
> 
	{
		success:true,
		course:{
				imgUrl:'https://wx.qlogo/.cn',
				price:1200,
				suitablePerson:1,
				title:"零基础协议取证班",
				type:1,
				user:"裴梦槐",
				merchOrderId:"201903191915334617"
			},
	}

**7\. 查询分享成功单信息**
###### 接口功能
> 查询分享成功单信息

###### URL
> [https://www.pmhuai.top/wx/API/app_share/get]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 用户id		|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|shareOrder|object |返回分享单信息         	        |
	|avatarUrl|string 	|头像地址				|
	|bill	  |int 	    |分享单凭证				|
	|shareNum |int   	|分享次数				|
	|user	  |string	|昵称					|
	|userId	  |int		|用户id					|
	|totle	  |int		|分享单数量				|

###### 接口示例
> 示例：
> 
	{
		success:true,
		shareOrder:{
				avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIDtC6ZJib7Ux1qSrU7Z9EHSgsFZSlTPFYL4JckXf0wHVjeAnNs7JP6dknlbcicwd9jSOSJSQ7qKYiaQ/132",
				bill:'999000kkk',
				shareNum:6,
				user:"裴梦槐",
				userId:30,
			},
		totle:1,
	}

**8\. 获取支付交互信息**
###### 接口功能
> 获取支付交互信息

###### URL
> [https://www.pmhuai.top/wx/api/app_shopping/pay]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 用户id		|
	| openId	| true		| int		| 用户openId	|
	| courseId	| true		| int		| 购买课程id	|
	| desc		| true		| string	| 支付的描述信息|
	| totalPrice| true		| float		| 课程单价	|
	| notify_url| true		| string	| 购买成功的回调地址|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|orderId  |int		|订单id         	        |
	|res	  |object	|返回拉起支付信息         |
	|appid	  |string 	|小程序appid				|
	|nonceStr |string 	|随机字符串				|
	|package  |string   |统一下单接口返回的 prepay_id 参数值|
	|paySign  |string	|签名					|
	|signType |string	|签名类型，默认为MD5		|
	|timeStamp|string	|时间戳					|

###### 接口示例
> 示例：
> 
	{
		success:true,
		res:{
				appid:"wx8f81a74fc666a1f2",
				nonceStr:"escym2bgkbuq7ci23me5aikj6p9ihm9h",
				package:"prepay_id=wx27101845192315c1e4e2ef6e3947478525",
				paySign:"6293F72D54DA5F4A01234EC6E483702D",
				signType:"MD5",
				timeStamp:"1553653125",
			},
		orderId:1,
	}

**9\. 客户端修改订单状态(取消订单)**
###### 接口功能
> 客户端修改订单状态(取消订单)

###### URL
> [https://www.pmhuai.top/wx/api/app_order/cancelOrder]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 订单id		|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|

###### 接口示例
> 示例：
> 
	{
		success:true,
	}

**10\. 客户端修改订单状态(关闭订单)**
###### 接口功能
> 客户端修改订单状态(关闭订单)

###### URL
> [https://www.pmhuai.top/wx/api/app_order/closeOrder]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| id		| true		| int		| 订单id		|

###### 返回字段
> 
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|

###### 接口示例
> 示例：
> 
	{
		success:true,
	}

**11\. 查询订单是否已支付**
###### 接口功能
> 查询订单是否已支付

###### URL
> [https://www.pmhuai.top/wx/api/app_order/orderComplete]()

###### 支持格式
> JSON

###### HTTP请求方式
> POST

###### 请求参数
>
	| 请求参数   | 是否必填	| 参数类型	| 参数说明	|
	| :-------- | :--------	| :--------	| :--------	|
	| userId		| true		| int		| 用户id		|
	| courseId	| true		| int		| 课程id		|

###### 返回字段
>
	|返回字段  |字段类型  |		说明			|
	|:-----   |:------	|:----------------------------- |
	|success  |boolean	|返回结果状态。true：正常；false：错误。|
	|isPay    |int	    |该订单是否已支付过？ 1：已支付，不再进行支付；0：未支付，可以进行支付。|

###### 接口示例
> 示例：
>
	{
		success:true,
		isPay:1,
	}


