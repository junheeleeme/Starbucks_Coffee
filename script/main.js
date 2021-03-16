$(window).scroll(function(){ //스크롤 이동 효과
    const scrollTop = parseInt($(window).scrollTop());
    
    if(scrollTop > 0)
        bean_show();
    if(scrollTop < 1 )
        bean_hide();
    if(scrollTop > 500)
        reserve_show();
    if(scrollTop < 500)
        reserve_hide();
})

/* main bean */

function bean_show(){
    $(".bean_img").css({left : "10%", opacity : "1"});
    $(".bean_txt").css({right : "13.7%", opacity : "1"});
};
function bean_hide(){
    $(".bean_img").css({left : "-100%", opacity : "0"});
    $(".bean_txt").css({right : "-100%", opacity : "0"});
};
/* main bean */
/* main reserve */
function reserve_show(){
    $(".reserve_visual").css({opacity : '1'});
}

function reserve_hide(){
    $(".reserve_visual").css({opacity : '0'});
}
/* main reserve */

$.easing.easeOutCirc = function (x, t, b, c, d) { //animation effect
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};


// gnb 메뉴 슬라이드
$(".sub_gnb_inner>ul>li").hover(function(){
    $(this).siblings().children('.gnb_sub_wrap').css({display: 'none'});
    $(this).children('.gnb_sub_wrap').stop().slideToggle(400);
})


//메인 공지사항 롤링
news_rolling();

function news_rolling(){

    let move = $(".news_rolling>li").height();
    var news = 6;
    let cnt = $(".news_rolling>li").length-1;
    function rolling(){

        $(".news_rolling>li").eq(1).animate({ 'top' : 0 }, 400, function(){
            
            $(".news_rolling>li").eq(0).css({'top' : '21px'});
            news+=1;          
            $(".news_rolling>li").eq(0).insertAfter($(".news_rolling>li").eq(cnt));
        });
    }
    var rolling_start = setInterval(rolling, 2500);
}
//메인 공지사항 롤링

/* 프로모션 슬라이드 */
let prom_cnt = $(".slider_item>li").length;
const prom_first = $(".slider_item>li:first").clone();
const prom_last = $(".slider_item>li:last").clone();
prom_first.insertAfter(".slider_item>li:last");
prom_last.insertBefore(".slider_item>li:first");

let click_over = 1; //반복 클릭 방지
let selected_item = 1; // 슬라이드 순서
let slide_x = -695;  // 슬라이드 이동 값
let slide_start = 0; // start : 1 stop : 0
let slide_timerId = 0;


/* 슬라이드 버튼 클릭 & 호버 기능 시작 */
$(".promotion_txt").click(function(){

    $(".promotion_wrap").stop().slideToggle();

    if(slide_timerId != 0){
        $(".btn_prom>img").attr('src', 'img/btn_prom_down.png');
        clearInterval(slide_timerId);
        slide_timerId = 0;
    }
    else{
        sliding_init();
        $(".btn_prom>img").attr('src', 'img/btn_prom_up.png');
    }
})

$(".slider_left_mask>a").click(function(){
    sliding_left();
})

$(".slider_right_mask>a").click(function(){
    sliding_right();
})

$(".slider_toggle").click(function(){
    $(this).toggleClass('on');
    if(slide_timerId === 0){
        slide_timerId = setInterval(function(){
            sliding_right()
        }, 3000);

    }
    else{
        clearInterval(slide_timerId);
        slide_timerId = 0;
    }
})

$(".select_box>span").eq(0).click(function(){
    if(click_over != 0){
        click_over = 0;
        slide_x=-695;
        fn_slide(slide_x);
        selected_item = 1;
        focus_effect(selected_item);
    }
})

$(".select_box>span").eq(1).click(function(){
    if(click_over != 0){
        click_over = 0;
        slide_x=-1524;
        fn_slide(slide_x);
        selected_item = 2;
        focus_effect(selected_item);
    }
})

$(".select_box>span").eq(2).click(function(){
    if(click_over != 0){
        click_over = 0;
        slide_x=-2353;
        fn_slide(slide_x);
        selected_item = 3;
        focus_effect(selected_item);
    }
})

$(".slider_item>li>img").mouseover(function(){
    clearInterval(slide_timerId);
})

$(".slider_item>li>img").mouseout(function(){
    if(slide_timerId != 0){
        clearInterval(slide_timerId);
        slide_timerId = setInterval(function(){
            sliding_right()
        }, 3000);
    }
})

$(".slider_right_mask>a").mouseover(function(){
    clearInterval(slide_timerId);
})


$(".slider_right_mask>a").mouseout(function(){
    if(slide_timerId != 0){
        clearInterval(slide_timerId);
        slide_timerId = setInterval(function(){
            sliding_right()
        }, 3000);
    }
})

$(".slider_left_mask>a").mouseout(function(){
    if(slide_timerId != 0){
        clearInterval(slide_timerId);
        slide_timerId = setInterval(function(){
            sliding_right()
        }, 3000);
    }
})

$(".slider_left_mask>a").mouseover(function(){
    clearInterval(slide_timerId);
})

$(".slider_item>li>a").mouseout(function(){
    if(slide_timerId != 0){
        clearInterval(slide_timerId);
        slide_timerId = setInterval(function(){
            sliding_right()
            }, 3000);
    }
})

$(".slider_item>li>a").mouseover(function(){
    clearInterval(slide_timerId);
})
/* 슬라이드 버튼 클릭 & 호버 기능 끝 */


/* 슬라이드 관련 함수 시작 */
function sliding_init(){ 
    slide_x = -695; //슬라이드 이동 값 초기화
    selected_item = 1; //슬라이드 순서 초기화
    $('.slider_item').css({'left' : '-696px'}); // 첫 번째 슬라이드로 초기화
    $(".slider_item>li").css({opacity : '0.22'}); // 슬라이드 이동 효과 초기화
    $(".slider_item>li").eq(1).css({opacity : '1'});

    slide_timerId = setInterval(function(){
       sliding_right()
    }, 3000);
    $(".slider_controller>span").eq(0).addClass('on');
}


function sliding_left(){ //슬라이드 왼쪽 이동
    if(click_over != 0){
        click_over = 0;
        slide_x+=829;
        fn_slide(slide_x);
        focus_effect(--selected_item);
    }
}

function sliding_right(){ //슬라이드 오른쪽 이동
    if(click_over != 0){
        click_over = 0;
        slide_x-=829;
        fn_slide(slide_x);
        focus_effect(++selected_item);
    }
}

function fn_slide(x){ //슬라이드 이동 애니메이션
    // PC : margin-left : -695 -> -1524 -> -2353
    // 이동 : 819

    $(".slider_item").stop().animate({'left' : x + 'px'}, 600, 'easeOutCirc', () => {

        if(x === -3182){
            slide_x = -695;
            $(".slider_item").css({'left' : slide_x + 'px'});
        }
        else if(x === 134){
            slide_x = -2353;
            $(".slider_item").css({'left' : slide_x + 'px'});
        }
        click_over = 1;
    });
    console.log(slide_x);
}

function focus_effect(selected){ //슬라이드 이동 효과
    
    if( selected > 0 && selected < 4){
        setTimeout(() => {
            $(".slider_item>li").css({opacity : '0.22'});
            $(".slider_item>li").eq(selected).css({opacity : '1'});
        }, 500); 
        $(".select_box>span").eq(selected-1).toggleClass('on').siblings().removeClass('on');
    }
    else if( selected <= 0){
        selected_item = 3;
        focus_effect(selected_item);
    }
    else if( selected > 3){
        selected_item = 1;
        focus_effect(selected_item);
    }
}
/* 슬라이드 관련 함수 끝 */
/* 프로모션 슬라이드 끝*/




