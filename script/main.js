

$(".sub_gnb_inner>ul>li").hover(function(){
    $(this).siblings().children('.gnb_sub_wrap').css({display: 'none'});
    $(this).children('.gnb_sub_wrap').stop().slideToggle(400);
})


news_slide();


function news_slide(){

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

