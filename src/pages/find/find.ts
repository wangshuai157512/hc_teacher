//index.js
//获取应用实例
import { IMyApp } from '../../app'
// @ts-ignore

const app = getApp<IMyApp>()

Page({
  data: {
    userInfo: {},
    all: ['全部','报考条件','报考时间','考试科目','报考方式','成绩查询','普通话','证书认定'],
    hasUserInfo: false,
    quesDetal: 0,
    answerContent: true,
    activeContent: null,
    activeIndex: 0,
    a:false,
    lists:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
    list2:[
          {
              content : [
                  {
                      title : '教师资格考试分为哪些种类？',
                      contentText : [
                          {
                              text : '幼儿园、小学、初级中学、高级中学教师资格考试。'
                          }
                      ]
                  },
                  {
                      title : '报考的学历要求是什么？',
                      contentText : [
                          {
                              img : '../../public/images/condition.jpg'
                          }
                      ]
                  },
                  {
                      title : '在校大学生可以考教师资格证吗？',
                      contentText : [
                          {
                              text : '可以。根据教师资格考试相关规定，本科在校三年及以上、专科在校两年及以上的大学生可以报考教师资格证。'
                          },
                      ]
                  },
                  {
                    title : '非全日制在读学生，可以报考吗?',
                    contentText : [
                        {
                            text : '非全日制考生需取得毕业学历证明，且在学信网可查的情况下，方可报考。'
                        },
                    ]
                },
                {
                    title : '报考资格证时，对学科有什么限制？',
                    contentText : [
                        {
                            text : '没有学科限制，考试大纲中的都可以报考。'
                        },
                    ]
                },
                {
                    title : '是否可以在异地考试？',
                    contentText : [
                        {
                            text : '可以。考试的地点如果不是户口所在地，需提供当地居住证。'
                        },
                    ]
                },
                {
                  title : '报名、考试时间是什么时候？',
                  contentText : [
                      {
                          img  : '../../public/images/time.jpg'
                      }
                  ]
                },
                {
                  title : '不同层级，分别考什么科目？',
                  contentText : [
                      {
                          text  : '幼儿园：《综合素质》《保教知识与能力》'
                      },
                      {
                          text  : '小学：《综合素质》《教育教学知识与能力》'
                      },
                      {
                          text  : '注：'
                      },
                      {
                          text  : '初级中学、高级中学：《综合素质》《教育知识与能力》《学科知识与教学能力》'
                      },
                      {
                          text  : '<div style="margin-top:20px"> 1)\t初级中学《学科知识与教学能力》分为语文、数学、英语、物理、化学、生物、思想品德、历史、地理、音乐、体育与健康、美术、信息技术、历史与社会、科学等科目。</div>\n'
                      },
                      {
                          text  : '<div style="margin-top:20px"> 2)\t高级中学《学科知识与教学能力》分为语文、数学、英语、物理、化学、生物、思想政治、历史、地理、音乐、体育与健康、美术、信息技术、通用技术等科目。</div>\n'
                      },
                      {
                          text  : '<div style="margin-top:20px"> 3)\t中学、小学、幼儿园的《综合素质》考试科目名称相同，中小学内容差不多，但幼儿园区别较大。</div>\n'
                      },
                  ]
                },
                        {
                            title : '教师资格考试如何报考？',
                            contentText : [
                                {
                                    text  : '<div style="color:#000; font-weight:bold;">①\t报名时间</div>',
                                },
                                {
                                    text  : '  每年的1月中旬和九月初（2019年下半年报名已截止）。',
                                },
                                {
                                    text  : '<div style="color:#000; font-weight:bold; margin-top:30px">②\t网上报名</div>'
                                },
                                {
                                    text  : '\t  报名网址：<span style="color:#00B35A"> http://ntce.neea.edu.cn/</span>（中国教育考试网）'
                                },
                                {
                                    text  : '登录并注册个人基本信息。包括户籍所在地、报考类别、学习形式、最高学历，手机号码等信息。'
                                },
                                {
                                    text  : ' <div style="margin-top:20px"> 上传个人照片。电子版照片要求为：</div>'
                                },
                                {
                                    text  : '(1)	本人近6个月以内的免冠正面证件照，不允许带帽子、头巾、发带、墨镜'
                                },
                                {
                                    text  : '(2)	照片格式及大小：JPG/JPEG格式，不大于200K'
                                },
                                {
                                    text  : '(3)	照片中显示考生头部和肩的上部，黑白或彩色均可，白色背景为佳\n'
                                },
                                {
                                    text  : '<div style="color:#000; font-weight:bold; margin-top:30px">③	网上/现场提交审核材料</div>'
                                },
                                {
                                    text  : '  考生应及时上网查看审核进度，审核通过后报名信息将不能更改，请仔细核对。\n'
                                },
                                {
                                    text  : '<div style="color:#000; font-weight:bold; margin-top:30px">④	网上缴费</div>\n'
                                },
                                {
                                    text  : '已通过审核的考生可以登录之前报名的网站（中小学教师资格考试网）进行网上缴费，费用为52-70元/科（具体费用以当地公告为准）。\n'
                                },
                                {
                                    text  : '<div style="color:#000; font-weight:bold; margin-top:30px">⑤	打印准考证</div>\n'
                                },
                                {
                                    text  : '报名成功的考生可于考前一周，登录报名网站下载并打印准考证，按要求准时参加考试。\n'
                                },
                        {
                          title : '教师资格证是全国通用的吗?',
                          contentText : [
                              {
                                text  : '按照国家规定，从正规渠道获得的教师资格证(国考/省考)，全国通用。'
                              }
                          ]
                        }
                    ]
                },
              {
                title : '教师资格证是全国通用的吗?',
                contentText : [
                    {
                      text  : '按照国家规定，从正规渠道获得的教师资格证(国考/省考)，全国通用。'
                    }
                ]
              },
              {
                title : '考试成绩如何查询？',
                contentText : [
                    {
                        text  : '成绩查询网址：<span style="color:#00B35A">http://ntce.neea.edu.cn/</span>（中国教育考试网）'
                    },
                    {
                        text  : '成绩公布时间一般在考试结束后1个月左右，具体可以关注官网或加老师微信（微信号：zhiye02）。'
                    },
                ]
              },
              {
                title : '成绩及资格证有效期多久？',
                contentText : [
                    {
                        text  : '笔试的单科有效期是2年，即需要在2年内通过未合格的科目，否则笔试成绩作废。'
                    },
                    {
                        text  : '面试的有效期是3年，即需要在3年内认定教师资格证，否则笔试、面试成绩全部作废。'
                    },
                    {
                        text  : '教师资格证一经认定，终身有效。'
                    },
                ]
              },
              {
                title : '普通话考试报名方式？',
                contentText : [
                    {
                        text  : '报名网址：<span style="color:#00B35A">http://bjbm.cltt.org/pscweb/index.html</span>'
                    },
                    {
                        text  : '报名费用：在校学生25元，非在校学生50元'
                    },
                    {
                        text  : '报名时间：各省报考时间不同，请以当地公告为准'
                    },
                ]
            },
            {
                title : '普通话成绩有效期多久？',
                contentText : [
                    {
                        text  : '永久有效。'
                    },
                    {
                        text  : '报名费用：在校学生25元，非在校学生50元'
                    },
                    {
                        text  : '报名时间：各省报考时间不同，请以当地公告为准'
                    },
                ]
            },
            {
                title : '普通话成绩如何查询',
                contentText : [
                    {
                        text  : '查询网址：<span style="color:#00B35A">http://www.cltt.org/studentscore</span> （适合全国考生）\n'
                    },
                    {
                        text  : '一般情况下，参加测试后15—40个工作日可以查询成绩，50个工作日可以领取证书。'
                    },
                ]
            },
            {
              title : '教师资格证如何认定？',
              contentText : [
                  {
                      text  : '1)	明确认定单位\n'
                  },
                  {
                      text  : '在校生一般可以在最后一个学期在所在地的教育局进行认定。'
                  },
                  {
                      text  : '已毕业考生一般在户籍或人事关系所在地认证。'
                  },
                  {
                      text  : '高中/中职教师资格一般由市级教育局认定；初中/小学/幼儿园教师资格一般由区县级教育局认定。'
                  },
                  {
                      text  : '<div style="margin-top:30px">2)	确定最近的认定时间安排</div>\n'
                  },
                  {
                      text  : '教师资格认定跟教师资格考试最大的区别是，教师资格认定的日程安排是由当地教育局决定，因此各地时间并不统一。你可以查找当地教育局一年内的认定时间安排，提前做好准备。'
                  },
                  {
                      text  : '<div style="margin-top:30px">3)	认定流程</div>\n'
                  },
                  {
                      text  : '认定流程一般包含：\n'
                  },
                  {
                      text  : '网上报名→现场确认(提交合格证明、普通话证书、体检表等)→教育部门认定\n'
                  },
                  {
                      text  : '<div style="margin-top:30px">4)	报名方式</div>\n'
                  },
                  {
                      text  : '报名网址：<span style="color:#00B35A">http://www.jszg.edu.cn/portal/home/in\ndex</span>（中国教师资格网)'
                  },
                  {
                      text  : '报名入口：分为【全国统考合格申请人网报入口】和【未参加全国统考申请人网报入口】'
                  },
                  {
                      text  : '注：\n'
                  },
                  {
                      text  : '【全国统考合格申请人网报入口】适用人群——\n'
                  },
                  {
                      text  : '持有教育部考试中心颁发的“中小学和幼儿园教师资格考试合格证明”的申请人。'
                  },
                  {
                      text  : '【未参加全国统考申请人网报入口】适用人群——\n'
                  },
                  {
                      text  : '① 不需要参加教师资格考试(包括笔试和实践能力测试)的师范教育类专业毕业生(包括全日制教育硕士毕业生)。'
                  },
                  {
                      text  : '② 参加各省份组织的教师资格考试(包括笔试和实践能力测试)且成绩合格的非师范教育类专业毕业生及需要参加实践能力测试的师范教育类专业毕业生。'
                  },
                  {
                      text  : '③ 申请认定高等学校教师资格者\n'
                  },
                  {
                      text  : '请申请人首先确定自己所属的类别，再点击对应的报名入口提交报名。'
                  },
              ]
          },
          {
              title : '考试通过了，就可以申请资格证吗？',
              contentText : [
                  {
                      text  : '教师资格证=笔试成绩+面试成绩+普通话等级+体检结果'
                  }
              ]
          },
          {
              title : '每年可以认定几个教师资格证？',
              contentText : [
                  {
                      text  : '从政策上看，不同省份一年有两次机会（上半年/下半年）认定教师资格证，考生可选择任意一次去认定。但是请注意，一年只能认定一个学科的教师资格证。'
                  }
              ]
          },


              ]
          },
          {
              content : [
                  {
                      title : '教师资格考试分为哪些种类？',
                      contentText : [
                          {
                              text : '幼儿园、小学、初级中学、高级中学教师资格考试。'
                          }
                      ]
                  },
                  {
                      title : '报考的学历要求是什么？',
                      contentText : [
                          {
                              img : '../../public/images/condition.jpg'
                          }
                      ]
                  },
                  {
                      title : '在校大学生可以考教师资格证吗？',
                      contentText : [
                          {
                              text : '可以。根据教师资格考试相关规定，本科在校三年及以上、专科在校两年及以上的大学生可以报考教师资格证。'
                          },
                      ]
                  },
                  {
                      title : '非全日制在读学生，可以报考吗?',
                      contentText : [
                          {
                              text : '非全日制考生需取得毕业学历证明，且在学信网可查的情况下，方可报考。'
                          },
                      ]
                  },
                  {
                      title : '报考资格证时，对学科有什么限制？',
                      contentText : [
                          {
                              text : '没有学科限制，考试大纲中的都可以报考。'
                          },
                      ]
                  },
                  {
                      title : '是否可以在异地考试？',
                      contentText : [
                          {
                              text : '可以。考试的地点如果不是户口所在地，需提供当地居住证。'
                          },
                      ]
                  },
              ]
          },
          {
              content : [
                  {
                      title : '报名、考试时间是什么时候？',
                      contentText : [
                          {
                              img  : '../../public/images/time.jpg'
                          }
                      ]
                  }
              ]
          },
          {
              content : [
                  {
                      title : '不同层级，分别考什么科目？',
                      contentText : [
                          {
                              text  : '幼儿园：《综合素质》《保教知识与能力》'
                          },
                          {
                              text  : '小学：《综合素质》《教育教学知识与能力》'
                          },
                          {
                              text  : '注：'
                          },
                          {
                              text  : '初级中学、高级中学：《综合素质》《教育知识与能力》《学科知识与教学能力》'
                          },
                          {
                              text  : '<div style="margin-top:20px"> 1)\t初级中学《学科知识与教学能力》分为语文、数学、英语、物理、化学、生物、思想品德、历史、地理、音乐、体育与健康、美术、信息技术、历史与社会、科学等科目。</div>\n'
                          },
                          {
                              text  : '<div style="margin-top:20px">2)\t高级中学《学科知识与教学能力》分为语文、数学、英语、物理、化学、生物、思想政治、历史、地理、音乐、体育与健康、美术、信息技术、通用技术等科目。</div>\n'
                          },
                          {
                              text  : '<div style="margin-top:20px">3)\t中学、小学、幼儿园的《综合素质》考试科目名称相同，中小学内容差不多，但幼儿园区别较大。</div>\n'
                          },
                      ]
                  },
              ]
          },
          {
              content : [
                  {
                      title : '教师资格考试如何报考？',
                      contentText : [
                          {
                              text  : '<div style="color:#000; font-weight:bold;">①\t报名时间</div>',
                          },
                          {
                              text  : '  每年的1月中旬和九月初（2019年下半年报名已截止）。',
                          },
                          {
                              text  : '<div style="color:#000; font-weight:bold; margin-top:30px">②\t网上报名</div>'
                          },
                          {
                              text  : '\t  报名网址：<span style="color:#00B35A"> http://ntce.neea.edu.cn/</span>（中国教育考试网）'
                          },
                          {
                              text  : '登录并注册个人基本信息。包括户籍所在地、报考类别、学习形式、最高学历，手机号码等信息。'
                          },
                          {
                              text  : ' <div style="margin-top:20px"> 上传个人照片。电子版照片要求为：</div>'
                          },
                          {
                              text  : '  （1）	本人近6个月以内的免冠正面证件照，不允许带帽子、头巾、发带、墨镜'
                          },
                          {
                              text  : '  （2）	照片格式及大小：JPG/JPEG格式，不大于200K'
                          },
                          {
                              text  : '  （3）	照片中显示考生头部和肩的上部，黑白或彩色均可，白色背景为佳\n'
                          },
                          {
                              text  : '<div style="color:#000; font-weight:bold; margin-top:30px">③	网上/现场提交审核材料</div>'
                          },
                          {
                              text  : '  考生应及时上网查看审核进度，审核通过后报名信息将不能更改，请仔细核对。\n'
                          },
                          {
                              text  : '<div style="color:#000; font-weight:bold; margin-top:30px">④	网上缴费</div>\n'
                          },
                          {
                              text  : '已通过审核的考生可以登录之前报名的网站（中小学教师资格考试网）进行网上缴费，费用为52-70元/科（具体费用以当地公告为准）。\n'
                          },
                          {
                              text  : '<div style="color:#000; font-weight:bold; margin-top:30px">⑤	打印准考证</div>\n'
                          },
                          {
                              text  : '报名成功的考生可于考前一周，登录报名网站下载并打印准考证，按要求准时参加考试。\n'
                          },
                      ]
                  },
                  {
                    title : '教师资格证是全国通用的吗?',
                    contentText : [
                        {
                          text  : '按照国家规定，从正规渠道获得的教师资格证(国考/省考)，全国通用。'
                        }
                    ]
                  }
              ]
          },
          {
            content : [
                {
                    title : '考试成绩如何查询？',
                    contentText : [
                        {
                            text  : '成绩查询网址：<span style="color:#00B35A">http://ntce.neea.edu.cn/</span>（中国教育考试网）'
                        },
                        {
                            text  : '成绩公布时间一般在考试结束后1个月左右，具体可以关注官网或加老师微信（微信号：zhiye02）。'
                        },
                    ]
                },
                {
                    title : '成绩及资格证有效期多久？',
                    contentText : [
                        {
                            text  : '笔试的单科有效期是2年，即需要在2年内通过未合格的科目，否则笔试成绩作废。'
                        },
                        {
                            text  : '面试的有效期是3年，即需要在3年内认定教师资格证，否则笔试、面试成绩全部作废。'
                        },
                        {
                            text  : '教师资格证一经认定，终身有效。'
                        },
                    ]
                }
            ]
          },
          {
            content : [
                {
                    title : '普通话考试报名方式？',
                    contentText : [
                        {
                            text  : '报名网址：<span style="color:#00B35A">http://bjbm.cltt.org/pscweb/index.html</span>'
                        },
                        {
                            text  : '报名费用：在校学生25元，非在校学生50元'
                        },
                        {
                            text  : '报名时间：各省报考时间不同，请以当地公告为准'
                        },
                    ]
                },
                {
                    title : '普通话成绩有效期多久？',
                    contentText : [
                        {
                            text  : '永久有效。'
                        },
                        {
                            text  : '报名费用：在校学生25元，非在校学生50元'
                        },
                        {
                            text  : '报名时间：各省报考时间不同，请以当地公告为准'
                        },
                    ]
                },
                {
                    title : '普通话成绩如何查询',
                    contentText : [
                        {
                            text  : '查询网址：<span style="color:#00B35A">http://www.cltt.org/studentscore</span> （适合全国考生）\n'
                        },
                        {
                            text  : '一般情况下，参加测试后15—40个工作日可以查询成绩，50个工作日可以领取证书。'
                        },
                    ]
                },
            ]
          },
          {
            content : [
                {
                    title : '教师资格证如何认定？',
                    contentText : [
                        {
                            text  : '1)	明确认定单位\n'
                        },
                        {
                            text  : '在校生一般可以在最后一个学期在所在地的教育局进行认定。'
                        },
                        {
                            text  : '已毕业考生一般在户籍或人事关系所在地认证。'
                        },
                        {
                            text  : '高中/中职教师资格一般由市级教育局认定；初中/小学/幼儿园教师资格一般由区县级教育局认定。'
                        },
                        {
                            text  : '<div style="margin-top:30px">2)	确定最近的认定时间安排</div>\n'
                        },
                        {
                            text  : '教师资格认定跟教师资格考试最大的区别是，教师资格认定的日程安排是由当地教育局决定，因此各地时间并不统一。你可以查找当地教育局一年内的认定时间安排，提前做好准备。'
                        },
                        {
                            text  : '<div style="margin-top:30px">3)	认定流程</div>\n'
                        },
                        {
                            text  : '认定流程一般包含：\n'
                        },
                        {
                            text  : '网上报名→现场确认(提交合格证明、普通话证书、体检表等)→教育部门认定\n'
                        },
                        {
                            text  : '<div style="margin-top:30px">4)	报名方式</div>\n'
                        },
                        {
                            text  : '报名网址：<span style="color:#00B35A">http://www.jszg.edu.cn/portal/home/in\ndex</span>（中国教师资格网)'
                        },
                        {
                            text  : '报名入口：分为【全国统考合格申请人网报入口】和【未参加全国统考申请人网报入口】'
                        },
                        {
                            text  : '注：\n'
                        },
                        {
                            text  : '【全国统考合格申请人网报入口】适用人群——\n'
                        },
                        {
                            text  : '持有教育部考试中心颁发的“中小学和幼儿园教师资格考试合格证明”的申请人。'
                        },
                        {
                            text  : '【未参加全国统考申请人网报入口】适用人群——\n'
                        },
                        {
                            text  : '① 不需要参加教师资格考试(包括笔试和实践能力测试)的师范教育类专业毕业生(包括全日制教育硕士毕业生)。'
                        },
                        {
                            text  : '② 参加各省份组织的教师资格考试(包括笔试和实践能力测试)且成绩合格的非师范教育类专业毕业生及需要参加实践能力测试的师范教育类专业毕业生。'
                        },
                        {
                            text  : '③ 申请认定高等学校教师资格者\n'
                        },
                        {
                            text  : '请申请人首先确定自己所属的类别，再点击对应的报名入口提交报名。'
                        },
                    ]
                },
                {
                    title : '考试通过了，就可以申请资格证吗？',
                    contentText : [
                        {
                            text  : '教师资格证=笔试成绩+面试成绩+普通话等级+体检结果'
                        }
                    ]
                },
                {
                    title : '一年可以认定几个教师资格证？',
                    contentText : [
                        {
                            text  : '从政策上看，不同省份一年有两次机会（上半年/下半年）认定教师资格证，考生可选择任意一次去认定。但是请注意，一年只能认定一个学科的教师资格证。'
                        }
                    ]
                },
            ]
        },
      ]
  },
  tapname(e:any) {
    // var lists:any = this.data.lists;
    // lists[e.currentTarget.dataset.index] = 0-lists[e.currentTarget.dataset.index];
    this.setData!({
      // activeContent: !this.data.activeContent,
      quesDetal: e.currentTarget.dataset.index,
    //   if(this.data.quesDetal==e.currentTarget.dataset.index) {
    //     a:!this.data.a,
    //     lists:lists  
    //   }
    })
  },
  tapask () {
    this.setData!({
      answerContent: !this.data.answerContent,
    })
  },
  tapever(e:any) {
    this.setData!({
      // activeContent: !this.data.activeContent,
      activeIndex:e.currentTarget.dataset.index,
      quesDetal: 0
    })
  },
  // 分享
  onShareAppMessage(): any {
    return {
      title: '教资考试答疑，看看有你的问题吗？',
      path: '/pages/find/find'
      // imageUrl: this.data.normalUrl + this.data.courseInfo.imgUrl,
    }
},
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad() {
   
  }
})
