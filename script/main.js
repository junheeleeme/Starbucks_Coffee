

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


/* 프로모션 슬라이드 */
let prom_cnt = $(".slider_item>li").length;
const prom_first = $(".slider_item>li:first").clone();
const prom_last = $(".slider_item>li:last").clone();
prom_first.insertAfter(".slider_item>li:last");
prom_last.clone().insertBefore(".slider_item>li:first");
let click_over = 1;

$(".promotion_txt").off().click(function(){
    $(".promotion_wrap").stop().slideToggle();
})

var slide_x = -695; 

$(".slider_left_mask>a").click(function(){
    if(click_over === 1){
        click_over = 0;
        slide_x+=829;
        fn_slide(slide_x);
    }       
})

$(".slider_right_mask>a").click(function(){
    if(click_over === 1){
        click_over = 0;
        slide_x-=829;
        fn_slide(slide_x);
    }
})

function fn_slide(x){
    // margin-left : 134 -> -695 -> -1524 -> -2353 -> -3182
    // 이동 : 819
   
    $(".slider_item").stop().animate({'margin-left' : x + 'px'}, 400, function(){

        if(x === -3182){
            slide_x = -695;
            $(".slider_item").css({'margin-left' : slide_x + 'px'});
        }
        else if(x === 134){
            slide_x = -2353;
            $(".slider_item").css({'margin-left' : slide_x + 'px'});
        }
        $(".slider_item>li").eq(2).css({opacity : '1'});
        click_over = 1;
    });    

}
/* 프로모션 슬라이드 */