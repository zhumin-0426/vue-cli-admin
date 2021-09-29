
前面地址：http://lb3.28888753.cn  

本地服务：192.168.120:8080/tuo_ke_wang

绑定微信 
https://www.28888753.com/getwxcode
?appid=wx9f3ffb724944ae27
&redirect_uri=http://lb.28888753.cn/shunde/logins/getCode?ids=1
&response_type=code
&scope=snsapi_userinfo
&state=1


https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0eca2988a16b17af&redirect_uri=http://lb3.28888753.cn/b/bing_ding_wx/getOpenid?ids=1&response_type=code&scope=snsapi_userinfo&state=1

////////////////////////////////////////请求转发数据///////////////////////////////////////////////////////

//请求转发的数据url
传入
地址：m/g_Z_H_zhuan_fa/g_Z_H_zhuan_fa_data
传参：wxurl //要转发的活动地址
返回
 	    l_data.add(timestamp);
            l_data.add(noncestr);
            l_data.add(signature);
            l_data.add(url);
            l_data.add(appid);
/////////////////////////////////////////////////////////////////////////////////////////////////////////

登录接口
地址：/b/logins/login
传入
/**
	 * 
	 * 用户登录

	 * usersPhone 账户（电话）
	 * usersPwd 密码
	 * **/
返回：
map.put("getUsersVO",getUsersVOList.get(0));//用户信息
map.put("state","success");
map.put("state","nosuccess");
map.put("reason","查询不到该用户信息");

表结构

private Integer id; //用户表
	private String businessName; //商家名称
	private String wxNums;//微信号
	private String wxName; //微信昵称
	private String usersName; //用户姓名
	private String usersPwd; //用户密码
	private String usersPhone; //用户手机号
	private Integer smallChange; //零钱
	private String images; //后台头像
	private String wxImage; //微信头像
	private Integer role; //角色 1.超级管理员 2.普通管理员3.代理商4.活动商5.用户
	private String gOpenid; //公众号的openId
	private String xOpenid; //小程序openid
	private String unionid; //unionid 公众号和小程序的 关联id
	private Integer followers; //追随者（用户的id）[帮你开会的代理]
	private Integer merchantType; //商户类型：1.个人2.企业
	private String usersStartTime; //用户开启时间
	private String usersEndTime; //用户使用截止时间
	private Integer limitType; //是否限定开户1.限定开户数2.不限定开户数
	private Integer limitNum; //开户数
	private Integer region; //地区 1.全国 2.规定开发用户区域/规定创建活动区域
	private Date lastUpTime; //最后修改时间
	private Integer lastUpUsersId; //最后修改人
	private String remarks; //备注
	private String recentLogin; //最近登录时间

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
	
//装载字段
	private String region_province_city;//地区  1.显示：例子01: 广东省/佛山市  例子02：全国     2.如果添加传数据：   以逗号隔开省和市场 例如  例子1   广东省, 例子2 广东省,佛山市 
	
	private String usersStartTimeName;//装载用户开启时间
	private String usersEndTimeName;//装载用户使用截止时间
	private String smallChange_money_show;//零钱 显示

///////////////////////////////////////////////////////////////////////////////////////

首页接口

地址：/b/getindex/index
 
传入
/**
	 * 
	 * 首页信息
	 * uid 用户id  用户 id=1
	 * 
	 * **/

返回
	map.put("getUsersVO",getUsersVO);//用户信息
	map.put("getRolePermissionVOList",getRolePermissionVOList);//左边导航栏
	map.put("getnoticeVOList",getnoticeVOList);//系统公告
	map.put("activity_num","2");//活动总数
	map.put("views_num","3000");//浏览总量
	map.put("share_volume","1000");//总分享量
	map.put("getUsersCustomerServiceList",getUsersCustomerServiceList);//联系客服
	map.put("state","success");

表结构

权限表
private Integer id; //角色编号
	private Integer roleId; //角色id
	private Integer permissionId; //权限id
	private String permissionIdentification; //权限功能标识码
	private String permissionUrl; //权限路径
	private Integer permissionCategory; //所属上级目录
	private String permissionName; //功能名称
	private Integer permissionAvailable; //是否可用1.可用2.不可用

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	
	//拓展字段
	private List<RolePermissionVO> rolePermissionVOList=new ArrayList<RolePermissionVO>();//权限列表


系统公告表

private Integer id; //系统公告
	private String title; //标题
	private String content; //内容
	private Integer display; //显示1.显示2.不显示
	private Date createTime; //
	private Integer createUsersId; //创建者id

联系客服表

private Integer id; //联系客服方式表
	private Integer usersId; //用户id
	private String names; //联络名称
	private String phones; //联系电话
	private String addr; //联系地址
	private String code; //图片（放微信二维码 或者其他联系图片）
	private Integer types; //类型1.默认联系方式（总管理的）2.代理的联系方式
	private String longitude; //经度
	private String latitude; //纬度

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数



/////////////////////添加用户_  添加客服联系方式/////////////////////////////////////////////////////////////////

用户管理

根据用户id 查询用户信息
地址：/b/getusers/ckusers
传入
/**
	 * 
	 * 根据用户id 查询用户信息

	 * uid 用户id
	 * 
	 * **/


返回 
	map.put("getUsersVO",getUsersVO);
	map.put("state","success");
        map.put("state","nosuccess");
	map.put("reason","查询不到该用户信息");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/getUsersList
/**
	 * 
	 * 用户列表
	 * 
	 * uid 用户id
	 * page 页码
	 * show_num
	 * UsersVO 用户全表信息（条件）
	 * **/

返回
        map.put("getusersVO_tiaojian",getusersVO);//返回条件信息
	map.put("getUsersVOList",getUsersVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/getusersAddData
/**
	 * 
	 * 用户添加时用到的 数据

	 * uid 用户id
	 * 
	 * **/

返回

        map.put("getroleList",getroleList);//角色列表
	map.put("getCnRegionInfoVOList",getCnRegionInfoVOList);//区域
	map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/ckPhone
/**
	 * 
	 * 查询电话 是否已经注册

	 * usersPhone 用户手机号码
	 * 
	 * **/

返回   
        
        map.put("msg","y");//已存在
	map.put("msg","n");//不存在
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/usersAdd

/**
	 * 
	 *用户添加

	 *uid 创建者id 
	 *businessName; //商家名称
	 *usersName; //用户姓名
	 *usersPwd; //用户密码
	 *usersPhone; //用户手机号
	 *images; //头像
	 *role; //角色
	 *merchantType; //商户类型：1.个人2.企业
	 *usersStartTime; //用户开启时间
	 *usersEndTime; //用户使用截止时间
	 *limitType; //是否限定开户1.限定开户数2.不限定开户数
	 *limitNum; //开户数
	 *region; //地区 1.全国 2.规定开发用户区域/规定创建活动区域
	 *region_province_city; 添加地区数据：   以逗号隔开省和市场 例如  例子1   广东省, 例子2 广东省,佛山市 
	 * **/
返回

	 map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/getusersUp
/**
	 * 
	 * 用户修改 信息展示
	 * uid 当前用户id
	 * upUid 要修改的用户id
	 * 返回修改信息
	 * **/

返回
	map.put("getUsersCustomerServiceVO",getus.get(0));//客服人员资料
	map.put("getUsersCustomerServiceVO",null);//没有客服人员资料
	map.put("getUsersCustomerServiceVO",getus.get(0));//客服人员资料 /没有客服人员资料
	map.put("getroleList",getroleList);//返回的角色数据
	map.put("getUsers",getUsers);//修改的用户数据
	map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
地址：/b/getusers/upUsers
/**
	 *用户修改
	 *uid 修改人id 
	 *id //被修改的id
	 *businessName; //商家名称
	 *usersName; //用户姓名
	 *usersPwd; //用户密码
	 *usersPhone; //用户手机号
	 *images; //头像
	 *role; //角色
	 *merchantType; //商户类型：1.个人2.企业
	 *usersStartTime; //用户开启时间
	 *usersEndTime; //用户使用截止时间
	 *limitType; //是否限定开户1.限定开户数2.不限定开户数
	 *limitNum; //开户数
	 *region; //地区 1.全国 2.规定开发用户区域/规定创建活动区域
	 *region_province_city; 添加地区数据：   以逗号隔开省和市场 例如  例子1   广东省, 例子2 广东省,佛山市 
	 *contactPersonName;//紧急联系人姓名
	 *contactPersonPhone;//紧急联系人电话
	 * **/

返回

	map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
地址：/b/getusers/usersUp

/**
	 * 
	 *用户修改
	 *uid 修改人id 
	 *id //被修改的id
	 *businessName; //商家名称
	 *usersName; //用户姓名
	 *usersPwd; //用户密码
	 *usersPhone; //用户手机号
	 *images; //头像
	 *role; //角色
	 *merchantType; //商户类型：1.个人2.企业
	 *usersStartTime; //用户开启时间
	 *usersEndTime; //用户使用截止时间
	 *limitType; //是否限定开户1.限定开户数2.不限定开户数
	 *limitNum; //开户数
	 *region; //地区 1.全国 2.规定开发用户区域/规定创建活动区域
	 *region_province_city; 添加地区数据：   以逗号隔开省和市场 例如  例子1   广东省, 例子2 广东省,佛山市 
         *contactPersonName;//紧急联系人姓名
	 *contactPersonPhone;//紧急联系人电话
	 *
	 *
	 *客服人员
	 *serviceId 要修的id（没有客服信息就添加 serviceId=0   修改就要传serviceId）
	 *usersId; //用户id
	 *names; //联络名称
	 *phones; //联系电话
	 *addr; //联系地址
	 *images; //图片（放微信二维码 或者其他联系图片）
	 *longitude; //经度
	 *latitude; //纬度 
	 * 
	 * **/

返回


	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/pwdUp
		 * 修改 密码
		 * 
		 * uid 要修的id
		 * pwd 原密码
		 * pwd_new 新密码
		 * **/
返回

	map.put("state","success");//成功
	map.put("state","nosuccess");//失败
	map.put("reason","原密码不正确,请重新输入");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/wx_users_bing_ding_list

		/**
		 * 微信列表
		 * 
		 * uid 用户id
		 * 
		 * **/
返回
	map.put("gopenid",getUsersVO.getGOpenid());//加入太阳码的 gopenid
	map.put("tai_yang_ma_url",tai_yang_ma_url);//返回太阳码图片地址
	map.put("getuwbdList", getuwbdList);//列表
	map.put("getuwbdList_num", getuwbdList.size());//条数

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/wx_users_bing_ding_qi_yong
/**
		 * 微信启用
		 * 
		 * wxid 启用的微信id
		 * uid  用户id
		 * **/
返回
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getusers/wx_users_bing_ding_jie
/**
		 * 微信解绑
		 * 
		 * wxid 解绑微信id
		 * **/

返回
 	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

传入
地址：/b/getusers/wx_users_bing_ding_del
/**
		 * 微信删除列表
		 * 
		 * wxid 微信id
		 * 
		 * **/
返回
	 map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
用户照片文件上传
传入
地址：/b/getusers/uploadfile_users
/**
	 * 
	 * 上传图片
	 * 用户图片
	 * file file文件
	 * uid 用户id
	 * **/

返回
	map.put("url","activityImgs/"+File.separator + filename);//图片地址
	map.put("state","success");//成功
	map.put("state","nosuccess");//失败


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
客服人员

传入
地址：/b/getusers/getUsersCustomerServiceVO
/**
		 * 
		 * 根据用户id 查询客服人员资料
		 * uid 用户id
		 * 
		 * **/
返回
                
                //返回判断id 有数据的修改没有数据就添加
		 map.put("getUsersCustomerServiceVO",getUsersCustomerServiceList.get(0));
		 map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
客服人员

传入
地址：/b/getusers/usersCustomerServiceVOadd
/**
		 * 添加
		 * usersId; //用户id
		 * names; //联络名称
		 * phones; //联系电话
		 * addr; //联系地址
		 * code; //图片（放微信二维码 或者其他联系图片）
		 * types; //类型1.默认联系方式（总管理的）2.代理的联系方式
		 * longitude; //经度
		 * latitude; //纬度 
		 * **/
返回

	        map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
客服人员

传入
地址：/b/getusers/usersCustomerServiceVOUp
/**
		 * 修改
		 * 
		 * id 要修的id
		 * usersId; //用户id
		 * names; //联络名称
		 * phones; //联系电话
		 * addr; //联系地址
		 * code; //图片（放微信二维码 或者其他联系图片）
		 * types; //类型1.默认联系方式（总管理的）2.代理的联系方式
		 * longitude; //经度
		 * latitude; //纬度 
		 * **/

返回            
		map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
客服照片文件上传
传入
地址：/b/getusers/uploadfile_service
/**
	 * 
	 * 上传图片
	 * 客服人员二维码
	 * file file文件
	 * uid 用户id
	 * **/
返回
	map.put("url","serviceImgs/"+File.separator + filename);//图片地址
	map.put("state","success");//成功
	map.put("state","nosuccess");//失败


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getPermission/roleList
/**
	 * 角色列表
	 * uid 用户id
	 * page 页码
	 * show_num 显示条数
	 * **/

返回：
	map.put("getUsersRoleVOList",getUsersRoleVOList);//集合
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/getPermission/rolePermissionList
/**
	 * 权限集合
	 * ids 角色id
	 * 
	 * **/

返回
	map.put("getUsersRoleVO",getUsersRoleVO);//角色信息
	map.put("getRolePermissionVOList",getRolePermissionVOList);//全部集合
	map.put("getRole_yi_xuan_VOList",getRole_yi_xuan_VOList);//已选集合
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址 /b/getPermission/rolePermissionUp
/**
	 * 修改权限
	 * 
	 * ids 角色id
	 * idList 赋予权限的功能的id 集合 以逗号隔开 1,2,3 
	 * 
	 * **/
返回
	map.put("state","success");
	
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
用户管理表结构

用户表
private Integer id; //用户表
	private String businessName; //商家名称
	private String wxNums;//微信号
	private String wxName; //微信昵称
	private String usersName; //用户姓名
	private String usersPwd; //用户密码
	private String usersPhone; //用户手机号
	private Integer smallChange; //零钱
	private String images; //后台头像
	private String wxImage; //微信头像
	private Integer role; //角色 1.超级管理员 2.普通管理员3.代理商4.活动商5.用户
	private String gOpenid; //公众号的openId
	private String xOpenid; //小程序openid
	private String unionid; //unionid 公众号和小程序的 关联id
	private Integer followers; //追随者（用户的id）[帮你开会的代理]
	private Integer merchantType; //商户类型：1.个人2.企业
	private String usersStartTime; //用户开启时间
	private String usersEndTime; //用户使用截止时间
	private Integer limitType; //是否限定开户1.限定开户数2.不限定开户数
	private Integer limitNum; //开户数
	private Integer region; //地区 1.全国 2.规定开发用户区域/规定创建活动区域
	private Date lastUpTime; //最后修改时间
	private Integer lastUpUsersId; //最后修改人
	private String remarks; //备注
	private String recentLogin; //最近登录时间

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
	
//装载字段
	private String region_province_city;//地区  1.显示：例子01: 广东省/佛山市  例子02：全国     2.如果添加传数据：   以逗号隔开省和市场 例如  例子1   广东省, 例子2 广东省,佛山市 
	
	private String usersStartTimeName;//装载用户开启时间
	private String usersEndTimeName;//装载用户使用截止时间
	private String smallChange_money_show;//零钱 显示





区域
private Integer id; 
	private Integer usersId; //用户id
	private String province; //省
	private String city; //市
	private String area; //区

省市区
private Integer cRIID; //自增ID
	private String cRICODE; //代码
	private String cRINAME; //名称
	private String cRISHORTNAME; //简称
	private String cRISUPERIORCODE; //上级代码
	private String cRILNG; //经度
	private String cRILAT; //纬度
	private Integer cRISORT; //排序
	private Date cRIGMTCREATE; //创建时间
	private Date cRIGMTMODIFIED; //修改时间
	private String cRIMEMO; //备注
	private Integer cRIDATASTATE; //状态
	private String cRITENANTCODE; //租户ID
	private String cRILEVEL; //级别

客服人员表
private Integer id; //联系客服方式表
	private Integer usersId; //用户id
	private String names; //联络名称
	private String phones; //联系电话
	private String addr; //联系地址
	private String images; //图片（放微信二维码 或者其他联系图片）
	private Integer types; //类型1.默认联系方式（总管理的）2.代理的联系方式
	private String longitude; //经度
	private String latitude; //纬度



角色表
private Integer id; //后台用户角色表
	private String roleName; //角色名
	private Date roleCreateDate; //创建时间
	private Integer roleCreateUserId; //创建人

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page;//页码

权限表
private Integer id; //角色编号
	private String sysIcon; //图标
	private Integer roleId; //角色id
	private Integer permissionId; //权限id
	private String permissionIdentification; //权限功能标识码
	private String permissionUrl; //权限路径
	private Integer permissionCategory; //所属上级目录
	private String permissionName; //功能名称
	private Integer permissionAvailable; //是否可用1.可用2.不可用

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
	
	//拓展字段
	private List<RolePermissionVO> rolePermissionVOList=new ArrayList<RolePermissionVO>();//权限列表


用户微信列表
private Integer id; //用户微信列表
	private Integer uid; //用户id
	private Integer types; //类型1.微信
	private String wxNames; //微信名称
	private String wxImges; //微信头像
	private String wxOpenid; //微信公众号openid
	private Integer states; //状态1.绑定2.解除绑定
	private Date createTime; //创建时间
	private Date lastUpTime; //最后更新时间
	private Integer lastUpUsersId; //用户id

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//装载字段
	private String lastUpTimeName;////最后操作时间


//////////////////////////////活动列表//////////////////////////////////////////

传入
地址：/b/activity/getActivityList
/**
		 * 活动列表
		 * uid 用户id
		 * page 页码
		 *show_num 显示的条数
		 *
		 *id_activityTitle_shareTitle;//条件查询(活动id|标题|分享标题)
		 *usersName_remarks//条件查询(用户名|备注)
		 * **/

返回
	map.put("activityVO_tiaojian",activityVO);//返回条件信息
	map.put("getActivityVOList",getActivityVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/getAdvertisementList
/**
		 * 
		 * 广告列表（获客大师）
		 * uid 用户id
		 * 
		 * **/
返回
	map.put("getAdvertisementVOList",getAdvertisementVOList);//返回集合
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。、
传入
地址：/b/activity/advertisementAdd
		 * 
		 * 添加多个广告（获客大师）
		 * uid 用户id
		 * activity_id 活动id
		 * advertisementIdList 广告表id  多个广告 例子1,2 或者1,
		 * **/
返回
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/advertisementdel
/**
		 * 
		 * 删除活动广告（获客大师）
		 * ids 广告ids
		 * **/
返回
		map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activity/addActivity_data_set
/**
		 * 活动参数限定
		 * 
		 * 添加活动 红包发放模式 上限参数设定
		 * 设定分享单个好友每次获得金额上限
		 * 分享单个好友后获得总金额上限
		 * 3.开启点击赚钱 每次点击获得多少（mailMoney） 上限（maxMoney）
		 * 设定 红包模式 获得金额上限
		 * **/

返回
	        map.put("getActivityDataSetVO1",getActivityDataSetVO1.get(0));//设定分享单个好友每次获得金额上限
		map.put("getActivityDataSetVO2",getActivityDataSetVO2.get(0));//分享单个好友后获得总金额上限
		map.put("getActivityDataSetVO3",getActivityDataSetVO3.get(0));//3.开启点击赚钱 每次点击获得多少（mailMoney） 上限（maxMoney）
		map.put("getActivityDataSetVO4",getActivityDataSetVO4.get(0));//设定 红包模式 获得金额上限


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/getCnRegionInfoVOList
/**
		 * 
		 * 添加活动 指定地区数据
		 * uid 用户id
		 * 
		 * **/

返回：
	         map.put("getCnRegionInfoVOList",getCnRegionInfoVOList);//返回地区数据  分3级 省 市 区 
		 map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/getCardRollVOListList
/**
		 * 
		 * 添加活动 卡卷列表
		 * uid 用户id
		 * 
		 * **/
返回

		map.put("getCardRollVOList",getCardRollVOList);//返回集合
		map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/getusersUploadList
/**
		 * 上传文件列表（图片/音乐）
		 * uid 用户id
		 * page 页码
		 * show_num 显示的条数
		 *
		 *(条件 2选1)
		 *types; //文件类型1.图片2.音乐3.客服二维码
		 * **/

返回
		map.put("getUsersUploadVOList",getUsersUploadVOList);//返回集合的信息
		map.put("count",count);//数据总条数
		map.put("page_zong",page_zong);//返回总页数
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activity/uploadfile
/**
		 * 
		 * 上传活动图片
		 * 
		 * file file文件
		 * uid 用户id
		 * **/
返回

		map.put("url","activityImgs/"+File.separator + filename);//图片地址
		map.put("state","success");//上传成功
		map.put("state","nosuccess");//上传失败
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activity/uploadfile_music
/**
		 * 
		 * 上传活动背景音乐
		 * 
		 * file file文件
		 * uid 用户id
		 * **/
返回

		map.put("url","activityMusic/"+File.separator + filename);//地址
		map.put("state","success");//上传成功
		map.put("state","nosuccess");//上传失败
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activity/addActivity
/**
		 * 
		 * 添加活动-第一页

		 * uid 用户id
		 * activityTitle; //活动名称
	         * leavingAMessage; //是否开启留言1.开启留言2.不开启留言
	         * content; //活动内容
	         * shareTitle; //分享标题
	         * shareDescribe; //分享描述
	         * shareShowImage; //分享图片
		 * 
		 * **/
返回
		map.put("activityVOId",activityVOId);//返回活动id
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activity/addActivity_red_envelopes
/**
		 * 
		 * 添加活动 红包发放模式
		 * uid 用户id
		 * id 活动id
		 * 根据不同现在填充数据
		    	*pattern; //红包领取模式1.分享朋友圈直接到账2.推广赚钱（分享好友赚钱）

			*clickToMakeMoney; //是否开启点击赚钱1.是2.否（例子 金额自己设定  开启后，好友每次点击获得0.1元，最高10元）

			*ranges; //获取红包范围_地区选择类型 1.指定地区2.指定范围（针对商圈  例如只能在该店附近）

			*backgroundMusic; //背景音乐

			*receiveRedEnvelopesTime; //红包领取倒计时(秒)为单位

			*openCardRoll; //是否开启卡劵1.开启2.不开启

			*cardRollProportion; //卡卷比例(卡卷开启才使用 比例)  开启卡劵后需要填写卡劵比例并添加1-5种卡劵。比如，卡劵比例为10，则在100个用户中会有10个用户分享后获得卡劵。

			*firstScreenAdvertisementImg; //首屏广告（1.图片尺寸：750px*1334px；2.图片大小必须小于1000KB；3.不传则不显示首屏广告）

			*pageTemplateTypes; //模板类型 1.模板2.模板
			
	                *share_single_Friends_money; //(推广赚钱（分享好友赚钱）)分享单个好友获得金额  *100

			*receive_num;  //(分享朋友圈直接到账)红包领取次数 1.每人只领取一次 2.每人每天领取一次

			*day_receive_num;//(分享朋友圈直接到账)红包领取次数上限 (选择2  每人每天领取一次  时使用的)

			*red_envelopes_pattern;//(分享朋友圈直接到账)红包模式 1.随机模式 2.等额模式

			*mail_Money;//(分享朋友圈直接到账)(随机模式)  最小金额*100

			*max_Money; //(分享朋友圈直接到账)(随机模式)  最大金额*100

			*moneys;//(分享朋友圈直接到账)(等额模式)金额 多个则用逗号隔开*100

			*probability;//(分享朋友圈直接到账)(等额模式)概率 多个则用逗号隔开

			*range_map_appoint_region;//(红包领取范围) 指定地区  多个则用逗号隔开   数据结构 例如  广东省/佛山市/顺德区,北京市/北京/东区   
 
			*map_appoint_range_longitude;//(红包领取范围)指定范围 经度

			*map_appoint_range_latitude;//(红包领取范围)指定范围    纬度

			*km;//(红包领取范围)指定范围    红包领取地区范围(km)

			*addr;//(红包领取范围)指定范围详细地址    红包领取地区范围(km)

			*cardRollIdList;//卡卷 集合id 以逗号隔开,  例子1,2,3

			*cardRollNumList;//卡卷设定数量 以逗号,隔开   例子5,6,7	
		 * 
		 * **/

返回
		map.put("state","success");//返回成功

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/activity/activityVOup
/**
		 * 
		 * 修改活动状态
		 * id 活动id
		 * uid 当前登录人id
		 * auditStatus 审核状态：1.待审核2.运行中（通过审核）3.审核驳回（审核不通过）4.已暂停5.已返还
                 *
		 * reasonsForFailureOfAudit  审核不通过原因
		 * **/
返回
		map.put("state","success");//返回成功
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构

活动表

private Integer id; //活动表
	private Integer usersId; //创建用户id
	private Integer followers; //追随者（用户的id）[帮你开会的代理]
	private Integer openActivity; //是否开启活动1.开启2.不开启
	private String activityTitle; //活动名称
	private Integer leavingAMessage; //是否开启留言1.开启留言2.不开启留言
	private String content; //活动内容
	private String shareTitle; //分享标题
	private String shareDescribe; //分享描述
	private String shareShowImage; //分享图片
	private Integer pattern; //红包领取模式1.分享朋友圈直接到账2.推广赚钱（分享好友赚钱）
	private Integer clickToMakeMoney; //是否开启点击赚钱1.是2.否（例子 金额自己设定  开启后，好友每次点击获得0.1元，最高10元）
	private Integer ranges; //获取红包范围_地区选择类型 1.指定地区2.指定范围（针对商圈  例如只能在该店附近）
	private String backgroundMusic; //背景音乐
	private Integer receiveRedEnvelopesTime; //红包领取倒计时(秒)为单位
	private Integer openCardRoll; //是否开启卡劵1.开启2.不开启
	private Integer cardRollProportion; //卡卷比例(卡卷开启才使用 比例)  开启卡劵后需要填写卡劵比例并添加1-5种卡劵。比如，卡劵比例为10，则在100个用户中会有10个用户分享后获得卡劵。
	private String firstScreenAdvertisementImg; //首屏广告（1.图片尺寸：750px*1334px；2.图片大小必须小于1000KB；3.不传则不显示首屏广告）
	private Integer pageTemplateTypes; //模板类型 1.模板2.模板
	private Integer viewsNum; //浏览总量
	private Integer shareVolume; //分享总量
	private Integer zan; //活动点赞数
	private Date createTime; //活动创建时间（区分HHmmss）
	private Integer auditStatus; //审核状态：1.待审核2.审核不通过3.通过审核
	private Integer auditUsersId; //审核人用户id
	private String reasonsForFailureOfAudit; //审核不通过原因

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//查询需要的字段
	private Integer usersIds;//创建用户id 传到sql查询（跟前端没有关系）
	private Integer followerss; //追随者（用户的id）[帮你开会的代理]传到sql查询（跟前端没有关系）
	private String sao_ma_Activity_url;//活动扫码地址
	
	private String id_activityTitle_shareTitle;//条件查询(活动id|标题|分享标题)
	private String usersName_remarks;//条件查询(用户名|备注)
	
//扩展字段
		private Integer  share_single_Friends_money; //(推广赚钱（分享好友赚钱）)分享单个好友获得金额  *100
		private Integer  receive_num;  //(分享朋友圈直接到账)红包领取次数 1.每人只领取一次 2.每人每天领取一次
		private Integer  day_receive_num;//(分享朋友圈直接到账)红包领取次数上限 (选择2  每人每天领取一次  时使用的)
		private Integer  red_envelopes_pattern;//(分享朋友圈直接到账)红包模式 1.随机模式 2.等额模式
		private String   mail_Money;//(分享朋友圈直接到账)(随机模式)  最小金额*100
		private String   max_Money; //(分享朋友圈直接到账)(随机模式)  最大金额*100
		private String   moneys;//(分享朋友圈直接到账)(等额模式)金额 多个则用逗号隔开*100
		private String   probability;//(分享朋友圈直接到账)(等额模式)概率 多个则用逗号隔开
		private String   range_map_appoint_region;//(红包领取范围) 指定地区  多个则用逗号隔开   数据结构 例如  广东省/佛山市/顺德区,北京市/北京/东区    
		private String   map_appoint_range_longitude;//(红包领取范围)指定范围 经度
		private String   map_appoint_range_latitude;//(红包领取范围)指定范围    纬度
		private String   km;//(红包领取范围)指定范围    红包领取地区范围(km)
		private String   addr;//(红包领取范围)指定范围详细地址    红包领取地区范围(km)
		private String   cardRollIdList;//卡卷 集合id 以逗号隔开,  例子1,2,3
		private String   cardRollNumList;//卡卷设定数量 以逗号,隔开   例子5,6,7	
//装载数据的
		private List<AdvertisementVO> advertisementVOList=new ArrayList<AdvertisementVO>();//广告集合
		private String createTimeName;//活动创建时间（前端显示）



活动设定默认最大参数表（活动创建不可超出该参数）

private Integer id; //活动设定默认最大参数（活动创建不可超出该参数）
	private Integer types; //参数类型1.分享单个好友一次获得金额上限 2.红包设定最大金额3.开启点击赚钱上限4.分享单个好友后获得总金额上限
	private Integer mailMoney; //下限金额
	private Integer maxMoney; //上限金额
	private Date lastUpTime; //最后更新时间
	private Integer lastUpUsersId; //最后更新人




地区表
private Integer cRIID; //自增ID
	private String cRICODE; //代码
	private String cRINAME; //名称
	private String cRISHORTNAME; //简称
	private String cRISUPERIORCODE; //上级代码
	private String cRILNG; //经度
	private String cRILAT; //纬度
	private Integer cRISORT; //排序
	private Date cRIGMTCREATE; //创建时间
	private Date cRIGMTMODIFIED; //修改时间
	private String cRIMEMO; //备注
	private Integer cRIDATASTATE; //状态
	private String cRITENANTCODE; //租户ID
	private String cRILEVEL; //级别



//上传文件的 文件表
private Integer id; //上传图片总表（所有图片就在这）
	private Integer usersId; //创建人id
	private String names; //文件名称
	private String urls; //文件地址
	private String sizes; //文件大小
	private String suffixs; //文件后缀
	private Integer types; //文件类型1.图片 2.音乐 3.服务人员图片
	private Date createTime; //创建时间

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//条件字段
	private String createTime_start;//(条件)开始时间
	private String createTime_end;//(条件)结束时间
	private String img_names;//(条件)图片名称
	private String usId;//(条件)用户id（只有管理员才能查看）
//装载字段
	private String createTimeName;//创建时间(前端显示)

//////////////////////////////////////////////////评论管理//////////////////////////////////////////////////////////////
传入

地址：/b/activityComment/getActivityCommentVOList
/**
			 * 
			 * 评论管理列表
			 * 
			 * uid 用户id
			 * page 页码
			 * show_num 显示的条数
			 * 
			 * activityId //活动id （条件 可传 可不传）
			 * **/
返回

	map.put("activityCommentVO_tiaojian",activityCommentVO);//返回条件信息
	map.put("getActivityCommentVOList",getActivityCommentVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入

地址：/b/activityComment/activityCommentVOUp
/**
			 * 
			 * 评论修改
			 * 
			 * uid 用户id
			 * id  评论表id 必传
			 * 
			 * 可改
			 * commentZan; //评论点赞数
	                 * isItSelected; //是否精选1.是精选2.不是精选
	                 * display; //是否活动是否显示1.显示2.不显示
			 * 
			 * **/
返回
                         map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
private Integer id; //活动评论表
	private Integer activityId; //活动id
	private Integer activityCreateUsersId; //活动创建者
	private Integer activityCreateFollowersUsersId; //追随者（用户的id）[帮你开会的代理]
	private Integer usersId; //评论者id
	private String comment; //评论内容
	private Integer commentZan; //评论点赞数
	private Date createTime; //创建时间（注意区分 时要24小的）
	private Integer isItSelected; //是否精选1.是精选2.不是精选
	private Integer display; //是否显示1.显示2.不显示
	private Date lastUpTime; //最后更新时间
	private Integer lastUpUsersId; //最后更新人

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
//装载信息	
	private String businessName; //活动商家名称(后台前端显示)
	private String usersName; //用户姓名(后台前端显示)
	private String createTimeName;//创建时间(前端显示)
	private UsersVO UsersVO;//用户信息

//////////////////////////////////////邀约//////////////////////////////////////////////

传入
地址：/b/activityAbout/getActivityAboutVOList
/**
	 * 
	 * 预约管理
	 * 
	 * uid 用户id
	 * page 页码
	 * show_num 显示的条数
	 * activityId 活动id（查询条件）
	 * **/

返回：

	map.put("activityAboutVO_tiaojian",activityAboutVO);//返回条件信息
	map.put("getActivityAboutVOList",getActivityAboutVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

传入
地址：/b/activityAbout/activityAbout_ex
/**
	 * 预约信息 导出
	 * uid 用户id
	 * 
	 * activityId 活动id（条件）
	 * **/



。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构

private Integer id; //预约信息表（在活动界面预约的）
	private Integer activityId; //活动id
	private Integer activityCreateUsersId; //活动创建者用户id
	private String name; //预约者姓名
	private String phone; //预约者电话
	private Date createTime; //创建时间
	private Integer handle; //是否已经处理1.已经处理2.未处理
	private String remarks; //备注（处理信息者 备注的）
	private Date lastUpTime; //最后更新时间
	private Integer lastUpUsersId; //最后更新时间

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数

//装载字段	
	private String businessName;//活动商家
	private String createTime_name;//创建时间
	private String activityName;//活动名称
//////////////////////////////////////////////////卡卷//////////////////////////////////////////
传入
地址：/b/cardRoll/getCardRollVOList
/**
		 * 
		 * 卡卷列表
		 * 
		 * uid 用户id
		 * page 页码
		 * 
		 * show_num 显示的条数
		 * 
		 * **/

返回
	map.put("cardRollVO_tiaojian",cardRollVO);//返回条件信息
	map.put("getCardRollVOList",getCardRollVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/cardRoll/getCardBusinessServiceTypesVOList
/**
		 * 卡卷商家服务类型集合
		 * uid 用户id
		 * 
		 * **/
返回
	map.put("getcardBusinessServiceTypesVOList",getcardBusinessServiceTypesVOList);//卡卷商家服务类型集合
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/cardRoll/addCardRollVO
/**
		 * 添加卡卷
		 * uid 用户id
		 * 
		 * **/
返回

	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

传入
地址：/b/cardRoll/upCardRollVO_cx
/**
		 * 卡卷详细
		 * ids 卡卷id
		 * 
		 * **/

返回
	map.put("getCardRollVO",getCardRollVO);//返回信息
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/cardRoll/upCardRollVO
/**
		 * 修改卡卷
		 * uid 修改者用户id 
		 * 
		 * images; //logo图片(可改可不改)
		 *cardName; //卡卷名称(可改可不改)
		 *cardBackgroundColor; //背景颜色(可改可不改)
		 *startingTime; //卡卷开始使用时间(可改可不改)
		 *endTime; //卡卷结束时间(可改可不改)
		 *cardInstructions; //卡券使用说明(可改可不改)
		 *offerDetails; //卡卷优惠详情(可改可不改)
		 *customerServicePhone; //客服电话(可改可不改)
		 *share; //与其他优惠共享 1.共享2.不共享(可改可不改)
		 *businessServiceTypes; //商家服务类型 (card_business_service_types表)(可改可不改)
		 * **/


返回：
		map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/cardRoll/uploadfile_card
/**
		 * 
		 * 上传卡卷图片
		 * 
		 * file file文件
		 * uid 用户id
		 * **/
返回
	map.put("url","cardRollImgs/"+File.separator + filename);//返回图片地址
	map.put("state","success");//成功
        map.put("state","nosuccess");//不成功
。。。。。。。。。。。。。。。。。。。。
表结构
//卡卷表
private Integer id; //卡卷表
	private Integer createUsersId; //卡卷创建者
	private Date createTime; //创建时间
	private String businessName; //商家名称
	private String images; //logo图片
	private String cardName; //卡卷名称
	private String cardBackgroundColor; //背景颜色
	private String startingTime; //卡卷开始使用时间
	private String endTime; //卡卷结束时间
	private String cardInstructions; //卡券使用说明
	private String offerDetails; //卡卷优惠详情
	private String customerServicePhone; //客服电话
	private Integer share; //与其他优惠共享 1.共享2.不共享
	private String businessServiceTypes; //商家服务类型 (card_business_service_types表)

	//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
	//查询需要的字段
	private String id_businessName_cardName;//条件查询(id|店铺名|卡卷名称)


 //卡卷_商家服务类型
	private Integer id; //卡卷_商家服务类型
	private String businessServiceTypesName; //商家服务类型名称

	//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数

//////////////////////////////////////////////上传文件/////////////////////////////////////////////
传入
地址：/b/usersUpload/getusersUploadList
/**
			 * 上传图片列表
			 * uid 用户id
			 * page 页码
			 * show_num 显示的条数
			 *
			 * createTime_start;//(条件)开始时间
			 * createTime_end;//(条件)结束时间
			 * img_names;//(条件)图片名称
			 * usId;//(条件)用户id（只有管理员才能查看）
			 * **/

返回

		map.put("usersUploadImgVO_tiaojian",usersUploadVO);//返回条件信息
		map.put("getUsersUploadVOList",getUsersUploadVOList);//返回集合的信息
		map.put("count",count);//数据总条数
		map.put("page_zong",page_zong);//返回总页数
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersUpload/usersUploadDel
/**
			 * 删除照片
			 * ids 照片id
			 * 
			 * 
			 * **/

返回：
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
private Integer id; //上传图片总表（所有图片就在这）
	private Integer usersId; //创建人id
	private String names; //文件名称
	private String urls; //文件地址
	private String sizes; //文件大小
	private String suffixs; //文件后缀
	private Integer types; //文件类型1.图片2.音乐
	private Date createTime; //创建时间

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//条件字段
	private String createTime_start;//(条件)开始时间
	private String createTime_end;//(条件)结束时间
	private String img_names;//(条件)图片名称
	private String usId;//(条件)用户id（只有管理员才能查看）




//////////////////////////////////////////////系统公告///////////////////////////////////////////
传入
地址：/b/notice/getNoticeVOList
/**
		 * 
		 * 系统公告
		 * uid 用户id
		 * page 页码
		 * show_num 显示的条数
	         * createTimeName;//条件（选择日期） 例子 2020-07-20
		 * labelName;//条件（标签）系统功能,普通公告 
		 * **/
返回：
		map.put("noticeVO_tiaojian",noticeVO);//返回条件信息
		map.put("getNoticeVOList",getNoticeVOList);//返回集合的信息
		map.put("count",count);//数据总条数
		map.put("page_zong",page_zong);//返回总页数
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/notice/getNoticeVO_detailed
/**
		 * 
		 * 系统公告详细
		 * ids 公告id
		 * 
		 * **/
返回
	map.put("getNoticeVO",getNoticeVO);//系统公告详细
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/notice/getnoticeLabelVOList
/**
		 * 
		 * 系统标签集合
		 * 
		 * uid 用户id
		 * 
		 * **/
返回
	map.put("getNoticeLabelVO",getNoticeLabelVO);//标签集合
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/notice/noticeVOAdd
/**
		 * 
		 * 添加系统公告
		 * 
		 * uid 用户id
		 * title; //标题
	         * content; //内容
	         * notice_label_id_list;//标签id 集合  多个标签 用逗号隔开
		 * **/
返回
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构

系统公告表
private Integer id; //系统公告
	private String title; //标题
	private String content; //内容
	private Integer display; //显示1.显示2.不显示
	private Date createTime; //
	private Integer createUsersId; //创建者id

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
//查询需要的字段
	private String createTimeName;//条件（选择日期） 例子 2020-07-20
	private String labelName;//条件（标签）系统功能,普通公告
	
//装载数据	
	private String notice_label_id_list;//标签id 集合  多个标签 用逗号隔开
	private String createTime_show;//显示公告时间



标签表

	private Integer id; //公告标签
	private String labelName; //标签

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数





///////////////////////////////////////////////资金管理/////////////////////////////////////////
传入
地址：/b/moneyWithdrawal/getMoneyWithdrawalVOList
/**
	 * 
	 * 提现列表
	 * uid 用户id
	 * page 页码
	 * show_num 显示的条数
	 * 
	 * createTime_start;//（条件）开始日期
	 * createTime_end;//（条件）结束日期
	 * id_usersName_remarks;//(条件)ID|用户名称|备注
	 * **/
返回
                        map.put("moneyWithdrawalVO_tiaojian",moneyWithdrawalVO);//返回条件信息
			map.put("getMoneyWithdrawalVOList",getMoneyWithdrawalVOList);//返回集合的信息
			map.put("count",count);//数据总条数
			map.put("page_zong",page_zong);//返回总页数
			map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/moneyWithdrawal/get_wx_users_num_list
/**
			 * 
			 * 提现的微信号集合
			 * 
			 * uid 用户id
			 * **/
返回
	map.put("wx_users_num",getUsersVOList);
	map.put("state","success");

//特别注明

选择微信号---》 显示是微信号  但是传入值是：gOpenid; //公众号的openId

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/moneyWithdrawal/moneyWithdrawalVOAdd
/**
			 * 
			 * 提现添加
			 * 
			 * uid 用户id
			 * usersName; //申请人姓名
			 * usersPhone; //用户电话
			 * withdrawalMoney; //提现金额*100进入数据库
			 * **/

返回

                         map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/moneyWithdrawal/moneyWithdrawalVO_to_examine
/**
			 * 
			 * 提现审核
			 * uid 用户id
			 * 修改
			 * 
			 * 3.已驳回4.撤销5.失败
			 * 
			 * **/
返回
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/moneyWithdrawal/moneyWithdrawalVO_tixian
/**
			 * 
			 * 提现功能
			 * 
			 * 2已审核
			 * 
			 * ids 申请提现id
			 * uid 审核人id
			 * **/

返回
                 rmap.put("start", 1);
                 rmap.put("remarks", "提现成功");
                 rmap.put("start", 2);
                 rmap.put("remarks", "验证错误,请重新操作");
                 rmap.put("start", 2);
                 rmap.put("remarks", "提现额度大于零钱,请重新输入");
                 rmap.put("start", 2);
                 rmap.put("remarks", "未绑定微信 请绑定微信");


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
private Integer id; //提现管理表
	private Integer usersId; //提现用户id
	private Date createTime; //创建时间（申请时间）
	private String usersName; //申请人姓名
	private String usersPhone; //用户电话
	private Integer types; //类型1.提现2.充值
	private Integer withdrawalMoney; //提现金额*100进入数据库
	private Integer toTheAccountMoney; //到账金额
	private Integer withdrawalMode; //提现方式1.微信
	private String withdrawalWxNum; //提现微信号
	private String withdrawalWxOpenid; //提现微信openid
	private String orderNum; //订单号
	private Integer state; //状态1.待审核2.已审核3.已驳回4.撤销5.失败
	private String reason; //状态_原因
	private Date lastUpTime; //最后更新时间
	private Integer lastUpUsersId; //最后更新人

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
//装载字段
	private String withdrawalMoney_money_show;//提现金额（前端显示这个）
	private String toTheAccountMoney_money_show;//到账金额（前端显示这个）
	private String createTimeName;//创建时间（申请时间）（前端显示这个）
	private String lastUpTimeName;//最后更新时间（前端显示这个）
	private String lastUpUsersIdName;//最后更新人（前端显示这个）



。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersAccountBookLog/getUsersAccountBookLogList
/**
		 * 
		 * 用户提现日志
		 * uid 用户id
		 * page 页码
		 * show_num 显示的条数
		 * 
		 * createTime_start;//(条件)开始日期
	         * createTime_end;//(条件)结束日期
	         * usersName;//(条件)用户名
		 * **/
返回			
		map.put("usersAccountBookLogVO_tiaojian",usersAccountBookLogVO);//返回条件信息
		map.put("getUsersAccountBookLogVOList",getUsersAccountBookLogVOList);//返回集合的信息
		map.put("count",count);//数据总条数
		map.put("page_zong",page_zong);//返回总页数
		map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
private Integer id; //账本表 （记录金额的进入账）
	private Integer activityId; //如果是活动就记录活动id
	private Integer usersId; //用户id
	private Integer types; //用户 1.充值  2.提现 3.红包金额（分享朋友圈模式） 4.分享好友赚到的钱（分享朋友圈模式）5.推广赚钱 
	private Integer money; //金额
	private Date createTime; //创建时间（注意要区分 时分秒）

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//装载条件
	private String createTime_start;//(条件)开始日期
	private String createTime_end;//(条件)结束日期
	private String usersName;//(条件,显示)用户名
	

	
	private Integer types_tj;//类型（小程序用到的条件）
	private Integer types_ck;//(验证是否有拿去红包  公众接口)查询 3.红包金额或者5.推广赚钱 
	private String typesName;//类型名称
	private String createTimeName;//创建时间
	private String money_show;//金额显示(前端显示这个金额 已经除100)
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址/b/moneyRecharge/getmoneyRechargeList
/**
	 * 
	 * 充值管理列表
	 * uid 用户id
	 * page 页码
	 * show_num 显示的条数
         *
	 * state; //状态1.支付成功2.支付失败3.未支付4.订单关闭
         * createTime_start;//（条件）开始日期
	 * createTime_end;//（条件）结束日期
	 * id_usersName_remarks;//(条件)ID|用户名称|备注
	 *
	 * **/
返回

	map.put("moneyRechargeVO_tiaojian",moneyRechargeVO);//返回条件信息
	map.put("getMoneyRechargeVOList",getMoneyRechargeVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址/b/moneyRecharge/moneyRechargeVOadd
/**
	 * 
	 * 充值
	 * uid 用户id
	 * orderMoney //订单金额*100
	 * **/

返回
	map.put("cid",moneyRechargeVO.getId());//返回充值id
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址/b/moneyRecharge/getMoneyRechargeVO
/**
	 * 
	 * 订单详细
	 * uid 用户id
	 * cid
	 * **/

返回

	map.put("getrechargeVo",getrechargeVo);//返回信息
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址/b/moneyRecharge/payMoney_hui
/**
		* 微信支付(扫码支付)
		* 有回调地址
		* 充值
		* 返回二维码地址
		* cid 充值id
		* moneys 充值的金额*100
		* uid 用户id
		* */


返回
	map.put("urlCode", urlCode);//二维码地址 
	map.put("state","success");//成功
	map.put("state","nosuccess");//失败了

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址/b/moneyRecharge/upMoneyRechargeVO
/**
	 * 
	 * 修改订单状态
	 * id  充值订单id
	 * state; //状态1.支付成功2.支付失败3.未支付4.订单关闭
	 * **/

返回	
	map.put("state","success");
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
充值表
private Integer id; //充值管理表
	private Integer createUsersId; //充值的用户id
	private String orderNum; //订单号
	private Integer orderMoney; //订单金额*100
	private Integer toTheAccountMoney; //到账金额*100
	private Date createTime; //创建时间（充值时间）
	private Date paymentTime; //支付时间
	private Integer state; //状态1.支付成功2.支付失败3.未支付4.订单关闭

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//查询字段
	private String  createTime_start;//（条件）开始日期
	private String  createTime_end;//（条件）结束日期
	private String  id_usersName_remarks;//(条件)ID|用户名称|备注

//用户装载字段
	private String usersName;//充值的用户名称(前端显示)
	private String createTime_name;//创建时间(前端显示)
	private String paymentTime_name;//支付时间(前端显示)
	private String orderMoney_money_show;//订单金额(前端显示)
	private String toTheAccountMoney_money_show;//到账金额(前端显示)

///////////////////////////////////////////////获客大师////////////////////////////////////////////////////////
传入
地址：/b/advertisement/getAdvertisementVOList
/**
		 * 
		 * 广告
		 * uid 用户id
		 * page 页码
		 * show_num 显示的条数
		 * 
		 * advertisementName_advertisementUrl;//(条件)广告名称/广告链接
		 * **/
返回

		map.put("advertisementVO_tiaojian",advertisementVO);//返回条件信息
		map.put("getMoneyRechargeVOList",getAdvertisementVOList);//返回集合的信息
		map.put("count",count);//数据总条数
		map.put("page_zong",page_zong);//返回总页数
		map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/advertisement/advertisementVOAdd
/**
			 * 
			 * 广告（抖音 快手  淘宝）密令
			 * uid 用户id
			 * 
			 * **/
返回

map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/advertisement/advertisementVOUP_cx
/**
			 * 查询要修改广告
			 * aid 修改广告的 id
			 * 
			 * **/

返回
	map.put("getAdvertisementVO",getAdvertisementVO);//广告详细
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/advertisement/advertisementVOUP
/**
		* 查询要修改广告
		* 
		* uid 用户id（当前登录人）
		* id 修改广告的 id
		* advertisementName; //广告名称
	        * advertisementUrl; //广告地址
	        * state; //状态1.显示2.不显示3.管理员禁止广告(可传可不传)
	        * reason; //管理员禁止原因(可传可不传)
			 * **/

返回

	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/advertisement/advertisementVODel
/**
			 * 删除广告
			 * 
			 * aid 广告id
			 * **/

返回

	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
表结构
private Integer id; //广告表（获客大师）抖音 淘宝 快手 等..
	private Integer createUsersId; //创建人用户id
	private String advertisementName; //广告名称
	private String advertisementUrl; //广告地址
	private Integer state; //状态1.显示2.不显示3.管理员禁止广告
	private String reason; //管理员禁止原因
	private Date lasetUpTime; //最后更新时间
	private Integer lasetUpUsersId; //最后更新人

//扩展字段
	private Integer startNum; //开始页数
	private Integer endNum; //结束页数
	private Integer page; //结束页数
	
//查询条件
	private String advertisementName_advertisementUrl;//(条件)广告名称/广告链接

////////////////////////////////////////设置微信小程序和微信公众号//////////////////////////////////
传入
地址：/b/usersDate/getUsersDateVOList

			/**
			 * 用户设置数据列表
			 * uid 用户id
			 * page 页码
			 * show_num 显示的条数
			 *
			 *
			 * **/

返回
	map.put("usersDateVO_tiaojian",usersDateVO);//返回条件信息
	map.put("getUsersDateVOList",getUsersDateVOList);//返回集合的信息
	map.put("count",count);//数据总条数
	map.put("page_zong",page_zong);//返回总页数
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersDate/addUsersDateVO
/**
			 * 
			 * 添加数据设置数据
			 *  usersId; //用户id
			 *	xAppId; //小程序appid
			 *	xAppSecret; //小程序app_secret
			 *	gzAppId; //公众号appid
			 *	gzAppSecret; //公众号app_secret
			 *	mchId; ////支付平台 商户号
			 *	wxKey; //支付平台  kay
			 *	paths; ////请求微信 提现 验证文件（文件在微信支付平台获得）(上传证书地址)
			 * 
			 * **/

返回
	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersDate/upUsersDateVO_cx

	/**
			 * 
			 *  查询修改数据
			 *  id //数据id
			 * **/

返回

	map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersDate/upUsersDateVO
/**
			 * 
			 *  修改数据设置数据
			 *  id       //数据id
			 *  usersId; //用户id
			 *	xAppId; //小程序appid
			 *	xAppSecret; //小程序app_secret
			 *	gzAppId; //公众号appid
			 *	gzAppSecret; //公众号app_secret
			 *	mchId; //支付平台 商户号
			 *	wxKey; //支付平台  kay
			 *	paths; //请求微信 提现 验证文件（文件在微信支付平台获得）(上传证书地址)
			 * 
			 * **/

返回
		map.put("state","success");

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/usersDate/uploadfile_zhengshu
/**
			 * 
			 * 上传微信验证文件
			 * 
			 * file file文件
			 * 
			 * **/

返回

	map.put("url",foldername+ firstfilename);//返回地址
	map.put("state","success");//上传成功
        map.put("state","nosuccess");//上传失败
。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。、
表结构

数据设置表
private Integer id; //用户公众号和小程序信息表

	private Integer usersId; //用户id
	private String xAppId; //小程序appid
	private String xAppSecret; //小程序app_secret
	private String gzAppId; //公众号appid
	private String gzAppSecret; //公众号app_secret
	private String mchId; ////支付平台 商户号
	private String wxKey; //支付平台  kay
	private String paths; ////请求微信 提现 验证文件（文件在微信支付平台获得）

	private String lastUpTime; //最后更新时间
	private Integer lastUpUserId; //最后更新人



//////////////////////////////////////微信绑定/////////////////////////////////////////////////////
传入
地址：/b/bing_ding_wx/usersWx_create
/**			
		 * 创建标识
		 * 返回 
		 * uid 用户id
		 * **/
返回
	map.put("erweima",erweima);//返回地址
	map.put("ids",wx.getId());//标识id
	map.put("state","success");//成功
	map.put("state","nosuccess");//失败

。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/bing_ding_wx/usersWx_ck

/**
			  * 查询是否已经返回标识
			  * 不断请求 查看openid 是否已经有了
			  * 传ids 查询
			* **/
返回：
			map.put("getwx",getwx);//返回实体
			map.put("state","success");
。。。。。。。。。。。。。。。。测试。。。。。。。。。。。。。。。。。。。。
传入
微信点击授权的url
ids 标识id 

https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0eca2988a16b17af&redirect_uri=http://lb3.28888753.cn/b/bing_ding_wx/getOpenid
?ids=1
&response_type=code&scope=snsapi_userinfo&state=1


。。。。。。。。。。。。。。。。。。。。测试。。。。。。。。。。。。。。。。。。。。。。。。。。
传入
地址：/b/bing_ding_wx/usersWx_bing_ding
/**
			  * 绑定微信
			  * （标识 已经拿到openid）
			  * 传标识id   ids
			  * 传用户id   uid
			  * 
			* **/

返回
	map.put("state","success");




https://www.28888753.com/getwxcode?appid=wx9f3ffb724944ae27&redirect_uri=http://lb.28888753.cn/shunde/logins/getCode?ids=${ids}&response_type=code&scope=snsapi_userinfo&state=1


。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。



	

