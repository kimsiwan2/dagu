/* ==========================================
   DAEGU LANDING PAGE INTERACTIONS & EFFECTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    initLandmarkFilters();
    initModals();
    initDodalssooChat();
    initFutureIndustries();
});

/* 1. Header Sticky Effect */
function initHeaderScroll() {
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* 3. Scroll Reveal Animation */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once shown
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* 4. Landmarks Filter System */
function initLandmarkFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const landmarkItems = document.querySelectorAll('.landmark-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            landmarkItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Hide with transition
                item.style.opacity = '0';
                item.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.add('show');
                        // Fade in
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.classList.remove('show');
                    }
                }, 300);
            });
        });
    });
}

/* 5. Modal System for Landmarks */
const landmarkDetails = {
    palgong: {
        badge: '국립공원 지정',
        title: '팔공산 국립공원',
        text: '2023년 대한민국의 23번째 국립공원으로 승격된 팔공산은 영남 지방을 대표하는 명산입니다. 불교 문화 유산이 가득하며, 특히 갓바위(관봉석조여래좌상)는 정성을 다해 기도하면 평생 한 가지 소원은 꼭 들어준다는 전설이 있어 연중 수많은 참배객들이 발길을 잇고 있습니다. 가을철 수려한 단풍 터널 드라이브와 팔공산 케이블카 탑승도 대표적인 힐링 코스입니다.',
        points: ['평생 한 가지 소원을 성취해 주는 갓바위 부처님', '사계절 수려한 풍광을 조망하는 팔공산 케이블카', '유서 깊은 사찰 동화사와 아름다운 동봉 등반 코스']
    },
    tower: {
        badge: '시티 랜드마크',
        title: '83타워 & 이월드',
        text: '대구의 아름다운 전경을 한눈에 감상할 수 있는 83타워는 대구의 스카이라인을 대표하는 가장 높은 다목적 타워입니다. 함께 위치한 이월드는 아름다운 유럽형 테마파크로 사계절 다채로운 꽃축제와 화려한 빛 축제를 운영하고 있습니다. 83타워 77층의 전망대와 78층의 회전 레스토랑은 대구 최고의 데이트 코스 및 관광 명소로 꼽힙니다.',
        points: ['대구 시내 전경을 360도로 한눈에 조망하는 77층 전망대', '익스트림 어트랙션과 사계절 테마 정원을 갖춘 이월드', '로맨틱한 다이닝과 포토존 가득한 타워 루프탑 광장']
    },
    kim: {
        badge: '예술 & 감성거리',
        title: '김광석 다시그리기 길',
        text: '대한민국의 전설적인 싱어송라이터 고(故) 김광석의 주옥같은 음악과 인생을 주제로 조성된 골목길입니다. 골목 담벼락마다 그려진 개성 넘치는 벽화와 아름다운 노래 가사들이 어쿠스틱 멜로디와 함께 잔잔하게 흘러나옵니다. 옛 감성을 자극하는 뉴트로 분위기의 카페와 공방들이 어우러져 젊은 층부터 기성세대까지 폭넓은 사랑을 받고 있습니다.',
        points: ['김광석의 노랫말과 삶이 묘사된 350m의 예술 벽화거리', '주말마다 길거리 음악 공연이 열리는 전용 야외 소공연장', '골목 특유의 감성을 느낄 수 있는 아기자기한 이색 카페와 굿즈샵']
    },
    chimac: {
        badge: '대한민국 대표 축제',
        title: '대구 치맥 페스티벌',
        text: '교촌치킨, 처갓집양념치킨 등 한국을 대표하는 대형 치킨 브랜드들의 발상지인 대구에서 개최하는 대표적인 글로벌 축제입니다. 매년 여름 뜨거운 태양 아래 대구 두류공원에 모여 갓 튀겨낸 치킨과 시원한 맥주를 들고 록 음악과 EDM 비트에 맞춰 춤추며 소통합니다. 대한민국에서 가장 에너제틱한 청춘들의 축제로 손꼽힙니다.',
        points: ['매년 100만 명 이상의 국내외 관광객이 몰리는 대형 K-푸드 축제', '유명 라인업 가수들의 힙합 & EDM 스테이지 공연', '얼음물 족욕 존과 수제 맥주 스트리트 등 무더위를 날리는 액티비티']
    },
    seomun: {
        badge: '전통 & 야간 관광',
        title: '서문시장 야시장',
        text: '조선시대 3대 시장 중 하나였던 서문시장은 오랜 역사를 자랑하는 대구의 대표 전통시장입니다. 해가 지면 화려한 조명과 함께 전국 최대 규모의 야시장이 개장합니다. 독창적인 퓨전 간식, 대구 대표 길거리 음식들이 가득한 푸드 트럭과 청년 예술가들의 버스킹 공연이 어우러져 매일 밤 수많은 인파로 활기가 가득 차는 대구 야간 관광 명소입니다.',
        points: ['대구 대표 10미인 납작만두, 막창, 떡볶이 등 환상적인 먹거리', '다채로운 버스킹 음악 공연 및 플리마켓 이벤트', '대구 도시철도 3호선 서문시장역 직통으로 완벽한 접근성']
    },
    food: {
        badge: '대구의 고유 미식',
        title: '대구 10미 (味)',
        text: '대구는 고유의 식재료와 화끈하고 쫄깃한 소스 문화로 발달한 10가지 특색 있는 향토 음식을 가지고 있습니다. 참숯에 구워 쫄깃하고 담백한 막창구이부터 야들야들한 피 속에 소를 얇게 넣어 구운 뒤 파간장을 얹어 먹는 납작만두, 마늘 소스가 듬뿍 들어간 동인동 매운갈비찜, 뭉텅뭉텅 썰어낸 한우 생고기 뭉티기까지 한국 최고 수준의 고유 미식을 선사합니다.',
        points: ['전국적인 명성을 떨치는 쫄깃한 숯불 막창구이와 곱창골목', '얇은 반죽피의 겉바속촉 매력을 보여주는 대구 특산 납작만두', '화끈하게 매운 고춧가루와 생마늘 양념이 특징인 양푼이 갈비찜']
    }
};

function initModals() {
    const modalOverlay = document.getElementById('info-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.landmark-item .btn-text');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.landmark-item');
            const id = card.getAttribute('data-id');
            const data = landmarkDetails[id];

            if (data) {
                // Populate Modal Content with styling & check SVG support
                let pointsListHtml = data.points.map(pt => `
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        ${pt}
                    </li>
                `).join('');

                modalContent.innerHTML = `
                    <span class="modal-badge">${data.badge}</span>
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                    <h4 style="margin-bottom: 12px; font-weight: 700; color: var(--text-main);">주요 하이라이트</h4>
                    <ul>
                        ${pointsListHtml}
                    </ul>
                    <button class="btn-gradient" id="modal-ok-btn" style="width: 100%; margin-top: 10px;">확인 완료</button>
                `;

                modalOverlay.classList.add('active');
                
                // Add click event to dynamic OK button
                document.getElementById('modal-ok-btn').addEventListener('click', closeModal);
            }
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    
    // Close on clicking overlay background
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
}

/* 6. Dodalssoo Mascot Interactive Chatbot */
const chatResponses = {
    q1: {
        question: '대구의 5대 신산업이 뭐야?',
        reply: `대구의 <strong>5대 미래 신산업</strong>은 대구의 지도를 바꿀 핵심 성장 엔진이야! 🚀<br><br>
        1. 💻 <strong>ABB</strong>: 인공지능(AI), 빅데이터(Big Data), 블록체인(Blockchain)을 합친 첨단 디지털 산업 클러스터 수성알파시티가 성장 중이야.<br>
        2. 🤖 <strong>로봇</strong>: 대구는 비수도권 최대 규모의 국가로봇테스트필드를 유치하며 대한민국 로봇 산업의 수도를 꿈꾸고 있어.<br>
        3. 🔌 <strong>반도체</strong>: 지능형 센서 반도체 등 차량용/비메모리 반도체 중심 생태계를 다지는 데 역량을 집중하고 있어.<br>
        4. 🛸 <strong>미래모빌리티</strong>: 도심항공교통(UAM) 실증노선 확보와 모빌리티 특화 단지를 조성해 미래형 이동을 책임져.<br>
        5. 🏥 <strong>헬스케어</strong>: 대구 첨단의료복합단지를 바탕으로 디지털 헬스케어 융합 솔루션의 허브로 거듭나고 있지.<br><br>
        전통 산업 중심에서 디지털/하이테크 중심의 '파워풀 미래도시'로 강력하게 비상하고 있단다! 🦦`
    },
    q2: {
        question: '대구에서 꼭 먹어봐야 할 먹거리 추천해줘!',
        reply: `대구에는 미식가들을 사로잡는 환상적인 <strong>'대구 10미(味)'</strong>가 가득해! 😋<br><br>
        가장 먼저 추천하는 것은 당연히 <strong>대구 막창구이</strong>! 숯불에 구워서 고소한 대구식 특제 쌈장에 찍어 먹으면 세상 행복하지.<br><br>
        두 번째는 <strong>납작만두</strong>야! 얇고 쫄깃한 만두피에 당면을 살짝 넣고 노릇하게 구워 파간장 양념이나 매콤한 떡볶이 소스에 적셔 먹으면 잊을 수 없을 걸.<br><br>
        그 외에도 화끈한 생마늘 양념이 듬뿍 들어간 <strong>동인동 매운갈비찜</strong>과 당일 잡은 소고기 생고기를 뭉텅이로 썰어 먹는 <strong>뭉티기</strong>도 강력 추천해! 🦦`
    },
    q3: {
        question: '여름 축제 \'치맥 페스티벌\' 정보 알려줘!',
        reply: `매년 여름 대구를 뜨겁게 달구는 최고의 글로벌 K-푸드 축제, <strong>대구 치맥 페스티벌</strong>을 소개해 줄게! 🍗🍺<br><br>
        사실 대구는 대한민국 유명 치킨 프랜차이즈들의 고향이자 발상지거든! 그래서 가장 오리지널하고 다채로운 치킨들을 만날 수 있어.<br><br>
        매년 7~8월 대구 <strong>두류공원 야외음악당 일대</strong>에서 열리는데, 시원한 생맥주와 갓 튀긴 치킨을 야외에서 돋자리 깔고 먹을 수 있고, 국내 최정상 뮤지션들과 함께하는 EDM 파티와 힙합 콘서트가 매일 밤 펼쳐져! 축제 내내 얼음 물에 발을 담그고 먹을 수 있는 공간도 있으니, 더운 대구 여름을 가장 쿨하게 즐길 기회야!`
    },
    q4: {
        question: '팔공산 국립공원의 매력은?',
        reply: `대구의 영산이자 대한민국 23번째 국립공원으로 지정된 <strong>팔공산</strong>은 역사와 힐링의 보물창고야! ⛰️<br><br>
        특히 봉우리에 있는 <strong>'관봉석조여래좌상(갓바위)'</strong>은 머리에 학사모 모양의 갓을 쓰고 있어 입시철마다 유명한데, <em>'지극정성으로 빌면 일생에 단 한 가지 소원은 반드시 들어주신다'</em>는 믿음이 있어서 전국에서 수많은 관광객이 모여.<br><br>
        등산이 부담스럽다면 <strong>팔공산 케이블카</strong>를 타고 가볍게 올라가 820m 높이에서 멋진 대구 풍경과 단풍을 감상할 수도 있고, 주변의 동화사나 파계사 템플스테이를 통해 지친 마음을 위로받기에도 더없이 훌륭해! 🦦`
    }
};

function initDodalssooChat() {
    const chatBox = document.getElementById('chat-box');
    const suggestButtons = document.querySelectorAll('.suggest-btn');

    suggestButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const qId = btn.getAttribute('data-question');
            const data = chatResponses[qId];
            
            if (data) {
                // Disable all suggestion buttons temporarily during dialogue
                suggestButtons.forEach(b => b.disabled = true);

                // 1. Add User Question Message
                addUserMessage(data.question);
                
                // Scroll down
                scrollToBottom();

                // 2. Add Typing Indicator
                const typingBubbleId = showTypingIndicator();
                scrollToBottom();

                // 3. Simulated Response Delay (1.2s)
                setTimeout(() => {
                    removeTypingIndicator(typingBubbleId);
                    addBotMessage(data.reply);
                    scrollToBottom();
                    
                    // Re-enable suggestion buttons
                    suggestButtons.forEach(b => b.disabled = false);
                }, 1200);
            }
        });
    });

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.innerHTML = `
            <div class="msg-bubble">${text}</div>
        `;
        chatBox.appendChild(msgDiv);
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot';
        msgDiv.innerHTML = `
            <div class="msg-bubble">${text}</div>
        `;
        chatBox.appendChild(msgDiv);
    }

    function showTypingIndicator() {
        const indicatorId = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot typing-indicator-msg';
        msgDiv.id = indicatorId;
        msgDiv.innerHTML = `
            <div class="msg-bubble" style="display: flex; gap: 4px; padding: 12px 20px; align-items: center;">
                <span class="dot-blink" style="width: 6px; height: 6px; background-color: var(--text-muted); border-radius: 50%; display: inline-block; animation: blink 1.4s infinite both;"></span>
                <span class="dot-blink" style="width: 6px; height: 6px; background-color: var(--text-muted); border-radius: 50%; display: inline-block; animation: blink 1.4s infinite both 0.2s;"></span>
                <span class="dot-blink" style="width: 6px; height: 6px; background-color: var(--text-muted); border-radius: 50%; display: inline-block; animation: blink 1.4s infinite both 0.4s;"></span>
            </div>
        `;
        
        // Append CSS keyframes dynamically for blinking indicator
        if (!document.getElementById('indicator-style')) {
            const style = document.createElement('style');
            style.id = 'indicator-style';
            style.innerHTML = `
                @keyframes blink {
                    0% { opacity: .2; transform: scale(0.9); }
                    20% { opacity: 1; transform: scale(1.1); }
                    100% { opacity: .2; transform: scale(0.9); }
                }
            `;
            document.head.appendChild(style);
        }
        
        chatBox.appendChild(msgDiv);
        return indicatorId;
    }

    function removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

/* 7. Future Industries Quick Details */
function initFutureIndustries() {
    const cards = document.querySelectorAll('.industry-card');
    
    // Quick tip to user that clicking shows more info
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const industryId = card.getAttribute('data-industry');
            const mockLandmarkBtn = document.createElement('button');
            
            // Trigger a modal pop for specific industry
            const industryDetails = {
                abb: {
                    badge: 'ABB 융합 도시',
                    title: 'ABB (인공지능 · 빅데이터 · 블록체인)',
                    text: '대구광역시는 대구 5대 미래산업의 중추인 ABB(AI, Big Data, Blockchain) 산업을 집중 육성하고 있습니다. 수성알파시티에 비수도권 최대 규모의 정보통신기술(ICT) 클러스터를 성공적으로 조성하였으며, 국내 IT 대기업 및 우수한 스타트업 유치, 지역 인재 육성 아카데미 등을 통해 지자체 차원의 디지털 대전환을 완벽히 이끌고 있습니다.',
                    points: ['수성알파시티 중심의 대규모 디지털 인프라 구축', '글로벌 테크 선도 기업 유치 및 정주 여건 지원', '지역 특화 AI 실증 사업 및 블록체인 행정 서비스 확대']
                },
                robot: {
                    badge: '글로벌 로봇수도',
                    title: '로봇 산업',
                    text: '대구는 기계 및 부품 제조업 기반을 바탕으로 국내 1위 산업용 로봇 생태계를 구축해 왔습니다. 국가적 대형 프로젝트인 국가로봇테스트필드 구축을 바탕으로 서비스용 및 산업용 로봇의 안전성 검증, 시험평가, 표준화, 실증 서비스까지 전방위 지원이 가능해졌으며, 로봇 연구 및 완성형 로봇 기업들의 집적으로 시너지 효과를 창출하고 있습니다.',
                    points: ['국가로봇테스트필드를 통한 글로벌 로봇 실증 메카 도약', '현대로보틱스 등 대한민국 최고 수준의 로봇 앵커기업 협업체계', '인간-로봇 공존형 규제자유특구를 통한 실증 실적 확대']
                },
                semiconductor: {
                    badge: '시스템 반도체 메카',
                    title: '반도체 산업',
                    text: '대구는 메모리 반도체 분야를 넘어 차량용 센서 및 시스템 반도체, 전력 반도체 분야로 새로운 도약을 시작했습니다. 대구경북과학기술원(DGIST)과 유기적으로 협력하여 인재 양성 생태계를 구축하고, 반도체 공동 연구소 건립, 팹리스 설계 지원 센터 설치 등 고도의 하이테크 인프라를 확장해 가고 있습니다.',
                    points: ['비메모리/차량용 센서 반도체 핵심 특화 클러스터 육성', 'DGIST 및 유수 대학과의 고도화된 석·박사급 반도체 설계 인재 양성', '시제품 제작용 반도체 클린룸 구축 및 기업 공정 실증 지원']
                },
                mobility: {
                    badge: '차세대 미래 모빌리티',
                    title: '미래모빌리티 (UAM / 친환경차)',
                    text: '기존의 내연기관 자동차 부품 중심의 산업 지형도를 친환경 전기차, 자율주행, 그리고 하늘을 나는 UAM(도심항공교통) 중심으로 완벽히 체질 개선하고 있습니다. 대구경북 신공항과 대구 도심을 연결하는 대구형 UAM 실증 인프라를 선제적으로 설계하고 있으며, 미래 모빌리티 모터 특화 단지 선정을 기반으로 선도 기업 유치를 가속하고 있습니다.',
                    points: ['대구경북신공항 연계 UAM 남부권 시범 노선 및 실증 비행', '미래 차 모터 부품 핵심 소부장 특화단지 입지 강화', '자유로운 자율주행 시험 운행지구 운영을 통한 실제 데이터 확보']
                },
                healthcare: {
                    badge: '스마트 웰니스',
                    title: '디지털 헬스케어',
                    text: '대구 첨단의료복합단지와 메디시티 대구의 영예를 바탕으로 의약품, 첨단 의료기기 연구 개발 인프라를 확고히 구축했습니다. 의료 가상현실, AI 의료영상 진단기기, 비대면 헬스케어 빅데이터 플랫폼 구축 등을 적극 추진하고 있으며, 의료 기술의 디지털 전환을 통해 초고령화 시대 스마트 라이프 솔루션을 개발합니다.',
                    points: ['대구경북첨단의료산업진흥재단을 중심의 의료 연구개발 생태계', '의료 정보와 첨단 소프트웨어가 융합된 의료 AI 솔루션 실증 개발', '글로벌 스마트 메디페스티벌 및 국내외 디지털 헬스케어 시장 진출']
                }
            };
            
            const data = industryDetails[industryId];
            if (data) {
                const modalOverlay = document.getElementById('info-modal');
                const modalContent = document.getElementById('modal-content');
                
                let pointsListHtml = data.points.map(pt => `
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        ${pt}
                    </li>
                `).join('');

                modalContent.innerHTML = `
                    <span class="modal-badge">${data.badge}</span>
                    <h2>${data.title}</h2>
                    <p>${data.text}</p>
                    <h4 style="margin-bottom: 12px; font-weight: 700; color: var(--text-main);">핵심 개발 전략</h4>
                    <ul>
                        ${pointsListHtml}
                    </ul>
                    <button class="btn-gradient" id="modal-ok-btn" style="width: 100%; margin-top: 10px;">확인 완료</button>
                `;

                modalOverlay.classList.add('active');
                document.getElementById('modal-ok-btn').addEventListener('click', () => {
                    modalOverlay.classList.remove('active');
                });
            }
        });
    });
}
