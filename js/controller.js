jQuery(function($){

  window.Posts = Spine.Controller.create({
  
    tag: "li",
  
    elements: {
    },
  
    events: {
    },
  
    init: function(){
    },
  
    render: function(){
    },
  
    show: function(){
    },
  
    remove: function(){
    }
  
  });

  window.Share = Spine.Controller.create({

	events: {
	"click #status"      : "status",
	"click #shareLink"   : "shareLink",
	"click #sharePhoto"  : "sharePhoto",
	"click #shareVideo"  : "shareVideo"
	},
	
	status: function(){
		
		if ($("#statusInput").css('display') == 'none') { 
			$("#shareInput > div").each(function(){$(this).hide();});
			$("#statusInput").show(); 
			$("#statusText").focus();
		}
		else $("#statusInput").hide();
		
	},
	
	shareLink: function() {
		
		if ($("#linkInput").css('display') == 'none') { 
			$("#shareInput > div").each(function(){$(this).hide();});
			$("#linkInput").show(); 
			$("#linkText").focus();
		}
		else $("#linkInput").hide();
		
	},
	
	sharePhoto: function() {
		
		if ($("#photoInput").css('display') == 'none') {
			
			$("#shareInput > div").each(function(){$(this).hide();});
			$("#photoInput").show();
			
		}
		else $("#photoInput").hide();
		
	},
	
	shareVideo: function() {
		
		
		if ($("#videoInput").css('display') == 'none') {
			
			$("#shareInput > div").each(function(){$(this).hide();});
			$("#videoInput").show();
			
		}
		else $("#videoInput").hide();
		//if ($("#videoInput").css('display') == 'none') $("#videoText").show();
//		else $("#videoText").hide();
		
	}
	
	
	  
  });


  window.FollowButtonApp = Spine.Controller.create({
  
    el: $("body"),
  
    proxied: [],
  
    elements: {
    },
  
    events: {
      "click #showhide"  : "showHide",
      "click #settings"  : "settings",
	  "click #privacy"   : "privacy",
	  "click #following" : "following",
	  "click #appearance": "appearance",
      "click #logout"    : "logout"
    },
    
    logout: function() {
      $.ajax({
        contentType: 'application/json',
        dataType: 'json',
  			type : 'POST',
  			data : JSON.stringify({}),
        url : '/profiles/logout',
        success : function(req) {
          if (false == req['ok']) {
     				alert('sorry, there was an error logging out');
          } else  {
            window.location.href = 'http://followbutton.com/';
  	      }
        }
      })
    },
    
    settings: function() {
      $.ajax({
        type : 'GET',
      	url : 'html/profiles/_settings.html',
        success : function(html) {
          var tpl = html;
          $.ajax({
            contentType: 'application/json',
            dataType: 'json',
      			type : 'POST',
      			data : JSON.stringify({}),
            url : '/profiles/_settings',
            success : function(req) {
              if (false == req['ok']) {
         				alert('sorry, there was an error loading the page');
              } else  {
                $("#partials").html($(Mustache.to_html(tpl, req)));
      	      }
            }
          })
        }
      });
    },
	
	 privacy: function() {
      $.ajax({
        type : 'GET',
      	url : 'html/profiles/_privacy.html',
        success : function(html) {
          var tpl = html;
          $.ajax({
            contentType: 'application/json',
            dataType: 'json',
      			type : 'POST',
      			data : JSON.stringify({}),
            url : '/profiles/_privacy',
            success : function(req) {
              if (false == req['ok']) {
         				alert('sorry, there was an error logging out');
              } else  {
                $("#partials").html($(Mustache.to_html(tpl, req)));
      	      }
            }
          })
        }
      });
    },
	
	 following: function() {
      $.ajax({
        type : 'GET',
      	url : 'html/profiles/_following.html',
        success : function(html) {
          var tpl = html;
          $.ajax({
            contentType: 'application/json',
            dataType: 'json',
      			type : 'POST',
      			data : JSON.stringify({}),
            url : '/profiles/_following',
            success : function(req) {
              if (false == req['ok']) {
         				alert('sorry, there was an error logging out');
              } else  {
                $("#partials").html($(Mustache.to_html(tpl, req)));
      	      }
            }
          })
        }
      });
    },
	
	 appearance: function() {
      $.ajax({
        type : 'GET',
      	url : 'html/profiles/_appearance.html',
        success : function(html) {
          var tpl = html;
          $.ajax({
            contentType: 'application/json',
            dataType: 'json',
      			type : 'POST',
      			data : JSON.stringify({}),
            url : '/profiles/_appearance',
            success : function(req) {
              if (false == req['ok']) {
         				alert('sorry, there was an error logging out');
              } else  {
                $("#partials").html($(Mustache.to_html(tpl, req)));
      	      }
            }
          })
        }
      });
    },

    init: function() {
      Profiles.init({ el:$("body") });
	  Share.init({ el:$("body") });
      $.ajax({
        type : 'GET',
      	url : 'html/_index.html',
        success : function(html) {
          
          var tpl = html;
          $.ajax({
            contentType: 'application/json',
            dataType: 'json',
      			type : 'POST',
      			data : JSON.stringify({}),
            url : '/profiles/index',
            success : function(req) {
              if (false == req['ok']) {
         				alert('sorry, there was an error loading the page');
              } else  {
                $("#partials").html($(Mustache.to_html(tpl, req)));
      	      }
            }
          })
          
        }
      });
    },
  
    showHide: function() {
    }

  });

  window.Profiles = Spine.Controller.create({
    events: {
  
    },
    init: function(){
      $("#login_name").focus();
    },
    signbtn: function(e) {
//  		window.location.href = 'https://followbutton.com/';
    },
    login: function(e){
      e.preventDefault();
      action = 'Login';
      if (action == 'Login') {
        res = this.auth({
          username:$("#login_name").val(),
          password:$("#login_pass").val(),
        });
      }
      if (action == 'Register') {
        res = this.reg({
          username:$("#login_name").val(),
          password:$("#login_pass").val(),
        });
      }
    },
    auth: function(obj) {
      var controller = this;
      var useremail = obj.username;
      $.ajax({
        contentType: 'application/json',
        dataType: 'json',
  			type : 'POST',
  			data : JSON.stringify({ 'username': obj.username, 'password': obj.password }),
        url : '/profiles/login',
        success : function(req) {
          if (false == req['ok']) {
     				alert('sorry, your username or password was incorrect');
          } else  {
            $("#logbtn").attr('value','Logout');
            $("#signbtn").hide();
            $("#formhider").hide();
            $("#useremail").html(useremail);
            $("#useremail").show();
            controller.after();
  	      }
  	      $("#login_pass").val('');
  	      $("#login_name").val('');
        }
      })
    },
    reg: function(obj) {
      var controller = this;
      $.ajax({
        contentType: 'application/json',
        dataType: 'json',
  			type : 'POST',
  			data : JSON.stringify({ 'username': obj.username, 'password': obj.password }),
        url : '/profiles/register',
        success : function(req) {
          if (false == req['ok']) {
     				alert('sorry, your new account could not be created');
          } else  {
            $("#logbtn").attr('value','Logout');
            $("#formhider").hide();
            $("#signbtn").hide();
            controller.after();
  	      }
  	      $("#login_pass").val('');
  	      $("#login_name").val('');
        }
      })
    },
    after: function() {
      var resource = 'posts';
      var action = 'index';
      $.ajax({
        type : 'GET',
  			url : '/templates/'+resource+'/'+action+'.html',
        success : function(req) {
        }
      })
    }
  });

  window.App = FollowButtonApp.init();

});