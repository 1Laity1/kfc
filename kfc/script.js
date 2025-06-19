document.addEventListener('DOMContentLoaded', function() {
    // 元素获取
    const moodImage = document.getElementById('mood-image');
    const textContent = document.getElementById('text-content');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');
    const bgMusic = document.getElementById('background-music');
    const menuContainer = document.getElementById('menu-container');
    const showMenuBtn = document.getElementById('show-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const shareBtn = document.getElementById('share-btn');
    const menuItems = document.querySelector('.menu-items');
    const bgAnimation = document.getElementById('bg-animation');
    const shareContainer = document.getElementById('share-container');
    const saveImageBtn = document.getElementById('save-image');
    const closeShareBtn = document.getElementById('close-share');
    const shareCanvas = document.getElementById('share-canvas');
    
    // 状态变量
    let rejectCount = 0;
    let gameOver = false;
    
    // 文案数组
    const rejectTexts = [
        "不会吧不会吧，不会真有人拒绝请我吃KFC吧？",
        "别这样嘛，看我可怜巴巴的眼神，我都饿成这样了",
        "别问，问就是v我50，吃肯德基！",
        "你忍心看我饿得两眼发黑，四肢无力，头晕目眩吗？",
        "我们之间的友谊就值一顿KFC？太伤心了"
    ];
    
    const acceptText = "卧槽！真的假的？你竟然同意了！爱你爱你，mua~";
    const finalRejectText = "算了算了，我还是去蹭我室友的泡面吧，呜呜呜";
    
    // 菜单项
    const menuData = [
        { name: "香辣鸡腿堡", price: "¥19.9", color: "#ff9e80" },
        { name: "吮指原味鸡", price: "¥12.5", color: "#ffcc80" },
        { name: "波纹薯条", price: "¥9.9", color: "#ffe57f" },
        { name: "葡式蛋挞", price: "¥8.0", color: "#fff59d" },
        { name: "黄金鸡块", price: "¥11.5", color: "#dce775" },
        { name: "劲爆鸡米花", price: "¥13.5", color: "#aed581" }
    ];
    
    // 初始化
    function init() {
        // 播放背景音乐
        bgMusic.volume = 0.3;
        
        // 添加用户交互后播放音乐
        document.body.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log("播放被阻止，需要用户交互"));
            }
        }, { once: true });
        
        // 初始化菜单（但不显示）
        initMenu();
        
        // 创建动态背景
        createBackgroundParticles();
        
        // 绑定事件
        acceptBtn.addEventListener('click', handleAccept);
        rejectBtn.addEventListener('click', handleReject);
        showMenuBtn.addEventListener('click', showMenu);
        closeMenuBtn.addEventListener('click', hideMenu);
        shareBtn.addEventListener('click', showShareOptions);
        saveImageBtn.addEventListener('click', saveShareImage);
        closeShareBtn.addEventListener('click', hideShareOptions);
        
        // 确保菜单一开始是隐藏的
        menuContainer.classList.add('hidden');
        shareContainer.classList.add('hidden');
        
        // 添加拒绝按钮的鼠标悬停效果
        rejectBtn.addEventListener('mouseover', function() {
            if (rejectCount > 1 && !gameOver) {
                moveRejectButton();
            }
        });
    }
    
    // 创建背景粒子
    function createBackgroundParticles() {
        bgAnimation.innerHTML = '';
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            
            // 随机大小
            const size = Math.random() * 50 + 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // 随机位置
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // 随机动画延迟
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            bgAnimation.appendChild(particle);
        }
    }
    
    // 处理接受按钮点击
    function handleAccept() {
        if (gameOver) return;
        
        // 更新图片
        moodImage.src = "图片/感谢.jpg";
        
        // 更新文案
        textContent.textContent = acceptText;
        
        // 更新音乐
        changeBgMusic("音乐/开心.mp3");
        
        // 添加特效
        document.body.style.backgroundColor = "#ffecb3";
        document.body.classList.add('accept-bg');
        acceptBtn.style.transform = "scale(1.3)";
        acceptBtn.style.boxShadow = "0 5px 30px rgba(228, 0, 43, 0.7)";
        
        // 禁用按钮
        disableButtons();
        
        // 添加表情雨效果
        createEmojiRain();
        
        gameOver = true;
    }
    
    // 处理拒绝按钮点击
    function handleReject() {
        if (gameOver) return;
        
        rejectCount++;
        
        // 添加页面抖动效果
        document.querySelector('.container').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.container').classList.remove('shake');
        }, 500);
        
        if (rejectCount <= 5) {
            // 更新图片
            moodImage.src = `图片/${rejectCount}.jpg`;
            
            // 更新文案
            textContent.textContent = rejectTexts[rejectCount - 1];
            
            // 根据拒绝次数修改按钮
            updateButtonsBasedOnRejectCount();
        } else {
            // 最终拒绝状态
            moodImage.src = "图片/这里没有疯狂星期四.jpg";
            textContent.textContent = finalRejectText;
            changeBgMusic("音乐/伤心.mp3");
            document.body.style.backgroundColor = "#e0e0e0";
            document.body.classList.add('reject-bg');
            
            // 禁用按钮
            disableButtons();
            
            gameOver = true;
        }
    }
    
    // 根据拒绝次数更新按钮
    function updateButtonsBasedOnRejectCount() {
        // 移除之前的高亮效果
        acceptBtn.classList.remove('highlight-accept');
        
        switch(rejectCount) {
            case 1:
                // 减小拒绝按钮
                rejectBtn.style.transform = "scale(0.9)";
                acceptBtn.style.transform = "scale(1.1)";
                acceptBtn.classList.add('highlight-accept');
                break;
            case 2:
                // 降低拒绝按钮透明度
                rejectBtn.style.opacity = "0.7";
                acceptBtn.style.transform = "scale(1.15)";
                acceptBtn.style.boxShadow = "0 0 15px rgba(228, 0, 43, 0.5)";
                acceptBtn.classList.add('highlight-accept');
                // 不添加mouseover事件，这次点击后不会有逃跑效果
                rejectBtn.removeEventListener('mouseover', moveRejectButton);
                break;
            case 3:
                // 交换按钮位置
                swapButtons();
                acceptBtn.style.transform = "scale(1.2)";
                acceptBtn.style.boxShadow = "0 0 20px rgba(228, 0, 43, 0.6)";
                acceptBtn.classList.add('highlight-accept');
                // 重新添加mouseover事件
                rejectBtn.addEventListener('mouseover', moveRejectButton);
                break;
            case 4:
                // 让拒绝按钮变成透明的幽灵按钮
                rejectBtn.style.transform = "scale(0.75)";
                rejectBtn.style.opacity = "0.4";
                rejectBtn.style.border = "1px dashed #ccc";
                acceptBtn.style.transform = "scale(1.25)";
                acceptBtn.style.boxShadow = "0 0 25px rgba(228, 0, 43, 0.7)";
                acceptBtn.classList.add('highlight-accept');
                // 不交换位置，恢复原来的顺序
                const buttonsContainer = document.querySelector('.buttons-container');
                if (buttonsContainer.firstChild === acceptBtn) {
                    buttonsContainer.insertBefore(rejectBtn, acceptBtn);
                }
                break;
            case 5:
                // 拒绝按钮更加不明显，并且添加抖动效果
                rejectBtn.style.transform = "scale(0.7)";
                rejectBtn.style.opacity = "0.5";
                rejectBtn.style.position = "relative";
                rejectBtn.classList.add('btn-shake');
                acceptBtn.style.transform = "scale(1.3)";
                acceptBtn.style.boxShadow = "0 0 30px rgba(228, 0, 43, 0.8)";
                acceptBtn.classList.add('highlight-accept');
                break;
        }
    }
    
    // 交换按钮位置
    function swapButtons() {
        const buttonsContainer = document.querySelector('.buttons-container');
        buttonsContainer.insertBefore(acceptBtn, rejectBtn);
    }
    
    // 随机移动拒绝按钮
    function moveRejectButton() {
        // 只在特定的拒绝次数下触发移动效果
        if (rejectCount !== 2 && rejectCount !== 4 && !gameOver) {
            // 增加最大偏移量，让按钮跑得更远
            const maxOffset = 150;
            const randomX = Math.random() * maxOffset * (Math.random() > 0.5 ? 1 : -1);
            const randomY = Math.random() * maxOffset * (Math.random() > 0.5 ? 1 : -1);
            
            rejectBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${0.9 - rejectCount * 0.05})`;
            
            // 确保按钮不会完全跑出视野，但延长恢复时间
            setTimeout(() => {
                if (!gameOver) {
                    rejectBtn.style.transform = `scale(${0.9 - rejectCount * 0.05})`;
                }
            }, 2000); // 延长到2秒
        }
    }
    
    // 更改背景音乐
    function changeBgMusic(src) {
        bgMusic.pause();
        bgMusic.src = src;
        bgMusic.play().catch(e => console.log("播放被阻止，需要用户交互"));
    }
    
    // 禁用按钮
    function disableButtons() {
        acceptBtn.disabled = true;
        rejectBtn.disabled = true;
        acceptBtn.style.cursor = "default";
        rejectBtn.style.cursor = "default";
    }
    
    // 创建表情雨效果
    function createEmojiRain() {
        const emojis = ['🍗', '🍔', '🍟', '🎉', '❤️', '😍', '👍'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 50; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'emoji-rain';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.animationDuration = Math.random() * 3 + 2 + 's';
            emoji.style.fontSize = Math.random() * 20 + 10 + 'px';
            
            container.appendChild(emoji);
            
            setTimeout(() => {
                emoji.remove();
            }, 5000);
        }
    }
    
    // 初始化菜单
    function initMenu() {
        menuItems.innerHTML = ''; // 清空菜单内容
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            
            // 创建SVG图像而不是使用占位图
            const foodSvg = createFoodSvg(item.name, item.color);
            
            menuItem.innerHTML = `
                <div class="food-image">${foodSvg}</div>
                <h3>${item.name}</h3>
                <p>${item.price}</p>
            `;
            
            menuItems.appendChild(menuItem);
        });
    }
    
    // 创建食物的SVG图像
    function createFoodSvg(name, bgColor) {
        // 根据食物名称创建不同的SVG图形
        let svgContent = '';
        
        if (name.includes('鸡腿堡')) {
            // 汉堡SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="65" r="30" fill="#f9a825"/>
                    <circle cx="50" cy="50" r="30" fill="#ffcc80"/>
                    <circle cx="50" cy="35" r="30" fill="#f9a825"/>
                    <rect x="20" y="30" width="60" height="10" fill="#8d6e63"/>
                    <rect x="20" y="60" width="60" height="10" fill="#8d6e63"/>
                    <circle cx="40" cy="50" r="5" fill="#66bb6a"/>
                    <circle cx="60" cy="50" r="5" fill="#ef5350"/>
                </svg>
            `;
        } else if (name.includes('原味鸡')) {
            // 炸鸡SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,30 Q50,20 70,30 Q80,50 70,70 Q50,80 30,70 Q20,50 30,30" fill="#ffcc80"/>
                    <path d="M30,30 Q50,40 70,30" fill="none" stroke="#d2691e" stroke-width="2"/>
                    <path d="M30,70 Q50,60 70,70" fill="none" stroke="#d2691e" stroke-width="2"/>
                    <circle cx="40" cy="45" r="3" fill="#d2691e"/>
                    <circle cx="60" cy="45" r="3" fill="#d2691e"/>
                </svg>
            `;
        } else if (name.includes('薯条')) {
            // 薯条SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="20" width="10" height="60" rx="2" fill="#ffeb3b"/>
                    <rect x="45" y="15" width="10" height="70" rx="2" fill="#ffeb3b"/>
                    <rect x="60" y="25" width="10" height="55" rx="2" fill="#ffeb3b"/>
                    <rect x="25" y="70" width="50" height="15" rx="5" fill="#f44336"/>
                </svg>
            `;
        } else if (name.includes('蛋挞')) {
            // 蛋挞SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,30 L70,30 L60,70 L40,70 Z" fill="#fff59d"/>
                    <path d="M25,30 L75,30 L70,20 L30,20 Z" fill="#ffe082"/>
                    <path d="M40,70 L60,70 L55,80 L45,80 Z" fill="#ffe082"/>
                </svg>
            `;
        } else if (name.includes('鸡块')) {
            // 鸡块SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="30" width="25" height="25" rx="5" fill="#ffcc80"/>
                    <rect x="55" y="30" width="25" height="25" rx="5" fill="#ffcc80"/>
                    <rect x="20" y="65" width="25" height="25" rx="5" fill="#ffcc80"/>
                    <rect x="55" y="65" width="25" height="25" rx="5" fill="#ffcc80"/>
                    <circle cx="32" cy="42" r="3" fill="#d2691e"/>
                    <circle cx="67" cy="42" r="3" fill="#d2691e"/>
                    <circle cx="32" cy="77" r="3" fill="#d2691e"/>
                    <circle cx="67" cy="77" r="3" fill="#d2691e"/>
                </svg>
            `;
        } else if (name.includes('鸡米花')) {
            // 鸡米花SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="30" r="10" fill="#ffcc80"/>
                    <circle cx="50" cy="25" r="12" fill="#ffcc80"/>
                    <circle cx="70" cy="30" r="10" fill="#ffcc80"/>
                    <circle cx="35" cy="50" r="12" fill="#ffcc80"/>
                    <circle cx="60" cy="50" r="10" fill="#ffcc80"/>
                    <circle cx="40" cy="70" r="10" fill="#ffcc80"/>
                    <circle cx="65" cy="70" r="12" fill="#ffcc80"/>
                </svg>
            `;
        } else {
            // 默认食物SVG
            svgContent = `
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="30" fill="${bgColor}"/>
                    <text x="50" y="55" font-size="12" text-anchor="middle" fill="#333">KFC</text>
                </svg>
            `;
        }
        
        return svgContent;
    }
    
    // 显示菜单
    function showMenu() {
        menuContainer.classList.remove('hidden');
    }
    
    // 隐藏菜单
    function hideMenu() {
        menuContainer.classList.add('hidden');
    }
    
    // 显示分享选项
    function showShareOptions() {
        // 生成分享图片
        generateShareImage().then(() => {
            shareContainer.classList.remove('hidden');
        });
    }
    
    // 隐藏分享选项
    function hideShareOptions() {
        shareContainer.classList.add('hidden');
    }
    
    // 生成分享图片
    async function generateShareImage() {
        const ctx = shareCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
        
        // 绘制标题
        ctx.fillStyle = '#e4002b';
        ctx.font = 'bold 24px Microsoft YaHei';
        ctx.textAlign = 'center';
        ctx.fillText('疯狂星期四', shareCanvas.width / 2, 40);
        
        // 绘制表情包
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        try {
            // 使用当前显示的图片
            const currentImage = document.getElementById('mood-image').src;
            img.src = currentImage;
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
            
            // 计算图片绘制尺寸，保持宽高比
            const aspectRatio = img.width / img.height;
            let drawWidth = 250;
            let drawHeight = drawWidth / aspectRatio;
            
            // 居中绘制图片
            ctx.drawImage(
                img, 
                (shareCanvas.width - drawWidth) / 2, 
                60, 
                drawWidth, 
                drawHeight
            );
            
            // 绘制文案
            ctx.fillStyle = '#333333';
            ctx.font = '16px Microsoft YaHei';
            
            const currentText = document.getElementById('text-content').textContent;
            wrapText(ctx, currentText, shareCanvas.width / 2, 60 + drawHeight + 30, 250, 20);
            
            // 绘制底部信息
            ctx.fillStyle = '#666666';
            ctx.font = '14px Microsoft YaHei';
            ctx.fillText('长按扫码，一起过疯狂星期四', shareCanvas.width / 2, shareCanvas.height - 20);
            
        } catch (error) {
            console.error('生成分享图片失败:', error);
            
            // 如果加载图片失败，绘制一个简单的替代图像
            ctx.fillStyle = '#ffcc80';
            ctx.fillRect((shareCanvas.width - 200) / 2, 60, 200, 150);
            
            ctx.fillStyle = '#e4002b';
            ctx.font = 'bold 18px Microsoft YaHei';
            ctx.fillText('疯狂星期四', shareCanvas.width / 2, 140);
            
            // 绘制文案
            ctx.fillStyle = '#333333';
            ctx.font = '16px Microsoft YaHei';
            ctx.fillText('今天星期四，兄dei，请我吃个肯德基呗~', shareCanvas.width / 2, 240);
        }
    }
    
    // 文本自动换行函数
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split('');
        let line = '';
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i];
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                context.fillText(line, x, y);
                line = words[i];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        
        context.fillText(line, x, y);
    }
    
    // 保存分享图片
    function saveShareImage() {
        try {
            // 创建一个临时链接并触发下载
            const link = document.createElement('a');
            link.download = '疯狂星期四.png';
            link.href = shareCanvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            alert('图片已保存，请发送给微信好友或分享到朋友圈！');
        } catch (error) {
            console.error('保存图片失败:', error);
            alert('保存图片失败，请尝试长按图片手动保存。');
        }
    }
    
    // 分享给朋友
    function shareToFriends() {
        // 检查是否支持分享API
        if (navigator.share) {
            navigator.share({
                title: '疯狂星期四',
                text: '今天星期四，兄dei，请我吃个肯德基呗~',
                url: window.location.href
            })
            .catch(error => console.log('分享失败:', error));
        } else {
            // 不支持分享API时，显示自定义分享弹窗
            showShareOptions();
        }
    }
    
    // 初始化应用
    init();
}); 