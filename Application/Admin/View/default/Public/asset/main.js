$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

function showCategory(controller, action) {
    createModal('goods-category', '商品分类');
    $.ajax({
        type: 'POST',
        url: '/index.php/Admin/Goods/showCategory/',
        data: '',
        success: function(result) {
            $('#goods-category .modal-body').html(result);
        }
    });
}

function hideCategory(controller, action) {
    $('#goods-category').modal('hide');
}

function createModal(id, title) {
    var html = 
'<div class="modal fade"  tabindex="-1" role="dialog" aria-labelledby="modalLabel" id="'+id+'">'+
    '<div class="modal-dialog" role="document">'+
        '<div class="modal-content">'+
            '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                '<h4 class="modal-title" id="modalLabel">'+title+'</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            'loading...'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';
    if($('#'+id).html() == undefined) {$(html).appendTo('body');}
    $('#'+id).modal('show');
}
