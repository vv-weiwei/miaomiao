<template>
    <div class="login">
        <div class="logo">

        </div>
        <!--        手机号-->
        <InputGroup
                type="number"
                v-model="phone"
                placeholder="手机号"
                :btnTitle="btnTitle"
                :disabled="disabled"
                :error="errors.phone"
                @btnClick="getVerifyCode"


        />
        <!--        验证码-->
        <InputGroup
                type="number"
                v-model="verifyCode"
                placeholder='验证码'


                :error="errors.code"


        />
        <!--        用户协议-->
        <div class="login_des">
            <p>
                新用户登录及自动注册，表示已同意
                <span>《新用户协议》</span>
            </p>
        </div>
        <!--        登录按钮-->
        <div class="login_btn">
            <button :disabled="isClick" @click="handleLogin">登錄</button>
        </div>
    </div>
</template>

<script>
import InputGroup from "../common/InputGroup/InputGroup";

export default {
    name: "Login",
    data() {
        return {
            phone: '',
            verifyCode: '',
            errors: {},
            btnTitle: "獲取驗證碼",
            disabled: false
        }

    },
    computed: {
        isClick() {
            if (!this.phone || !this.verifyCode)
                return true;
            else
                return false;

        }
    },
    methods: {
        handleLogin(){
            //取消錯誤提醒
            this.errors={}
            this.verifyCode==="15962817329" ? this.$router.push('/'): alert("失敗")
        },
        getVerifyCode() {
            // 判断手机是否合法
            if (this.validatePhone()) {

                this.validateBtn()
                // 发送网络请求
                this.$http.post('/api/posts/sms_send', {
                    tpl_id: '136729',
                    key: "795be723dd9e88c3ea98e2b6713ab795",
                    phone: this.phone
                })
                    .then(res => {
                        console.log(res)
                    })

            }

        },
        validateBtn() {
            let time = 60
            let timer = setInterval(() => {
                if (time === 0) {
                    clearInterval(timer);
                    this.btnTitle = '獲取驗證碼';
                    this.disabled = false
                } else {
                    // 倒計時
                    this.btnTitle = time + "秒後重試";
                    this.disabled = true
                    time--

                }
            }, 1000)
        },
        validatePhone() {
            // 验证手机号码
            // 为空
            if (!this.phone) {
                this.errors = {
                    phone: '手機號碼不能為空！'
                }
                return false
                // 正则验证大陆手机号
            } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
                this.errors = {
                    phone: '請填寫正確的大陸手機號碼！'
                }
                return false
            } else {
                this.errors = {}
                return true
            }
        }
    },
    components: {
        InputGroup
    }
}
</script>

<style scoped>
    .login {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background-color: #fff;
        text-align: center;
    }

    .logo {
        text-align: center;
    }

    .logo img {
        width: 150px;
    }

    .text_group,
    .login_des,
    .login_btn {
        margin-top: 20px;
    }

    .login_des {
        color: #aaa;
        line-height: 22px;
    }

    .login_des span {
        color: #4d90fe;
    }

    .login_btn button {
        width: 100%;
        height: 40px;
        background-color: #E54847;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        border: none;
        outline: none;
    }

    .login_btn button[disabled] {
        background-color: #8bda81;
    }
</style>

