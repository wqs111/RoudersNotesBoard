<template>
    <footer class="arknights-footer">
      <div class="footer-content">

        <div class="left">
            <!-- Logo区 -->
            <div class="footer-logo" @mouseover="triggerGlitch" @mouseleave="stopGlitch">
            <!-- <img src="@/assets/logo.png" alt="罗德岛终端系统" /> -->
            <p>{{ logoText }}</p>
            </div>
        </div>
        <div class="right-text">
            <!-- 版权声明 -->
            <div class="footer-copyright">
            <p>{{ copyrightText }}</p>
            </div>
    
            <!-- 联络方式 -->
            <button class="contact-button" @click="fakeAlert">
            {{ contactText }}
            <span class="hover-hint">{{ contactHint }}</span>
            </button>
    
            <!-- 导航链接 -->
            <nav class="footer-nav">
            <a v-for="link in navLinks" :key="link.text" href="#">{{ link.text }}</a>
            </nav>
    
            <!-- 彩蛋台词 -->
            <div class="footer-easter-egg">
            <p>{{ currentEasterEgg }}</p>
            </div>
    
            <!-- 免责声明 -->
            <div class="footer-disclaimer">
            <p>{{ disclaimerText }}</p>
            </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FootBar',
    data() {
      return {
        logoText: '罗德岛终端系统 v3.14 · 权限等级：博士',
        copyrightText: '© 2025 罗德岛制药 | 根据《泰拉国际法》第114条保留所有权利',
        contactText: '紧急通讯（CH-996）',
        contactHint: '通讯费：2理智/次（阿米娅友情赞助）',
        navLinks: [
          { text: '作战记录库' },
          { text: '干员值班表' },
          { text: '物资补给申请' },
        ],
        easterEggs: [
          '博士，您还有许多事情需要处理。',
          '本舰提醒：今日源石浓度超标，建议穿戴防护装备。',
          '警告：检测到整合运动网络攻击 → 防御协议已激活',
        ],
        currentEasterEgg: '',
        disclaimerText: '*本系统可能因天灾、源石虫或阿米娅的突击检查暂时下线。',
        isGlitching: false,
      };
    },
    mounted() {
      this.rotateEasterEgg();
      setInterval(this.rotateEasterEgg, 5000); // 每5秒轮换彩蛋台词
    },
    methods: {
      triggerGlitch() {
        this.isGlitching = true;
        this.logoText = '警告：检测到源石能波动 → 切换至作战模式';
      },
      stopGlitch() {
        this.isGlitching = false;
        this.logoText = '罗德岛终端系统 v3.14 · 权限等级：博士';
      },
      rotateEasterEgg() {
        const randomIndex = Math.floor(Math.random() * this.easterEggs.length);
        this.currentEasterEgg = this.easterEggs[randomIndex];
      },
      fakeAlert() {
        alert('通讯请求已发送至罗德岛指挥中心……');
      },
    },
  };
  </script>
  
  <style scoped>


  .arknights-footer {
    margin-top: 40px;
    background: #1a1a2e;
    border-top: 1px solid #4a4a6a;
    color: #a0a0c0;
    font-family: 'Courier New', monospace;
    padding: 20px;
    text-align: center;
  }
  
  .footer-logo {
    margin-bottom: 10px;
  }
  
  .footer-logo img {
    height: 50px;
  }
  
  .footer-logo p {
    margin-top: 5px;
    font-size: 14px;
  }
  
  .footer-copyright p {
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .contact-button {
    border: 1px dashed #ff5555;
    background: rgba(255, 0, 0, 0.1);
    color: #a0a0c0;
    padding: 5px 10px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .contact-button:hover .hover-hint {
    display: block;
  }
  
  .hover-hint {
    display: none;
    font-size: 10px;
    color: #ff5555;
  }
  
  .footer-nav {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 10px;
  }
  
  .footer-nav a {
    color: #a0a0c0;
    text-decoration: none;
  }
  
  .footer-nav a:hover {
    text-decoration: underline;
  }
  
  .footer-easter-egg p {
    font-size: 12px;
    font-style: italic;
    margin-bottom: 10px;
  }
  
  .footer-disclaimer p {
    font-size: 10px;
    opacity: 0.7;
  }
  
  /* 故障动画 */
  @keyframes glitch {
    0% { text-shadow: 2px 0 #ff00ff; }
    25% { text-shadow: -2px 0 #00ffff; }
    100% { text-shadow: none; }
  }
  
  .footer-logo:hover {
    animation: glitch 0.5s infinite;
  }
  </style>