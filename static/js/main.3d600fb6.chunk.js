(this["webpackJsonpreact-workout-tracker"]=this["webpackJsonpreact-workout-tracker"]||[]).push([[0],{142:function(t,e,n){},153:function(t,e,n){"use strict";n.r(e);var c,a=n(0),r=n(29),i=n.n(r),s=(n(142),n(26)),j=n(10),o=n(70),l=n(17),d=n(35),b=n(120),x=n.n(b),h=n(116),u=n.n(h),O=n(119),p=n.n(O),f=n(1);var g,v,y=function(){var t=d.a.div(c||(c=Object(s.a)(["\n\t\tposition: fixed;\n\t\tbottom: 0;\n\t\tleft: 0;\n\t\theight: 50px;\n\t\twidth: 100%;\n\t\tbackground: #fefefe;\n\t\tpadding: 0 10px;\n\t\tdisplay: flex;\n\t\tjustify-content: space-around;\n\t\talign-items: center;\n\t\tbox-shadow: 0 0 15px 3px #00000020;\n\t"]))),e={textDecoration:"none",color:"inherit",display:"flex",alignItems:"center",justifyContent:"center",height:"40px",width:"40px",borderRadius:"100%"},n={textDecoration:"none",color:"inherit",display:"flex",alignItems:"center",justifyContent:"center",height:"40px",width:"40px",borderRadius:"100%",boxShadow:"0 0 15px 3px #00000020"},a={height:"20px",width:"20px"};return Object(f.jsxs)(t,{children:[Object(f.jsx)(o.b,{to:"/calendar",style:function(t){return t.isActive?n:e},children:Object(f.jsx)(u.a,{style:a})}),Object(f.jsx)(o.b,{to:"/add",style:function(t){return t.isActive?n:e},children:Object(f.jsx)(p.a,{style:a})}),Object(f.jsx)(o.b,{to:"/template",style:function(t){return t.isActive?n:e},children:Object(f.jsx)(x.a,{style:a})})]})},m=d.a.div(g||(g=Object(s.a)(["\n\theight: calc(100vh - 200px);\n\twidth: 428px;\n\t/* border: thin solid black; */\n\tdisplay: flex;\n\tflex-direction: column;\n"]))),w=(d.a.div(v||(v=Object(s.a)(["\n\twidth: 100%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n"]))),n(213));var k,_=function(){return Object(f.jsx)(m,{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:Object(f.jsx)(w.a,{variant:"contained",style:{background:"rgb(144, 202, 249)",color:"black",fontWeight:"500"},children:"Sign In With Google"})})},S=n(61),I=(n(151),n(222)),D=n(214),E=n(212),W=n(160),N=n(221);var A=function(){var t=d.a.div(k||(k=Object(s.a)(["\n\t\twidth: 100%;\n\t\theight: 50px;\n\t\tbackground: #fefefe;\n\t\tborder-top: thin solid black;\n\t\tborder-bottom: thin solid black;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t"])));return Object(f.jsx)(t,{children:Object(f.jsx)(I.a,{variant:"h7",ml:2,children:"Workout Title"})})};var T,C=function(){var t=Object(a.useState)(new Date),e=Object(j.a)(t,2),n=e[0],c=e[1];return Object(f.jsxs)(m,{children:[Object(f.jsx)(W.b,{dateAdapter:E.a,children:Object(f.jsx)(N.a,{displayStaticWrapperAs:"mobile",value:n,onChange:function(t){c(t)},renderInput:function(t){return Object(f.jsx)(D.a,Object(S.a)({},t))},style:{width:"100%"}})}),Object(f.jsx)(I.a,{variant:"h6",mt:2,ml:2,style:{fontWeight:"bold"},children:"Workouts on this Day:"}),Object(f.jsx)(A,{})]})},R=n(215),X=n(211),G=n(219);var U=function(){var t=Object(a.useState)(new Date),e=Object(j.a)(t,2),n=e[0],c=e[1],r=Object(d.a)(m)(T||(T=Object(s.a)(["\n\t\talign-items: center;\n\t\tpadding: 20px;\n\t\toverflow-y: scroll;\n\t"])));return Object(f.jsx)(r,{children:Object(f.jsxs)(X.a,{spacing:3,children:[Object(f.jsx)(W.b,{dateAdapter:E.a,children:Object(f.jsx)(R.a,{label:"Workout Date",inputFormat:"MM/dd/yyyy",value:n,onChange:function(t){return c(t)},renderInput:function(t){return Object(f.jsx)(D.a,Object(S.a)({},t))}})}),Object(f.jsx)(D.a,{label:"Workout Name",variant:"filled"}),Object(f.jsx)(G.a,{variant:"contained",color:"primary",children:"Add Workout"})]})})};var F,J=function(){return Object(f.jsx)(m,{children:"Template Screen"})};var L=function(){var t=Object(a.useState)(1),e=Object(j.a)(t,2),n=e[0],c=(e[1],d.a.div(F||(F=Object(s.a)(["\n\t\twidth: 100%;\n\t\theight: 100vh;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t"]))));return Object(f.jsx)(o.a,{children:Object(f.jsx)(c,{children:n?Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)(l.c,{children:[Object(f.jsx)(l.a,{exact:!0,path:"/calendar",element:Object(f.jsx)(C,{})}),Object(f.jsx)(l.a,{exact:!0,path:"/add",element:Object(f.jsx)(U,{})}),Object(f.jsx)(l.a,{exact:!0,path:"/template",element:Object(f.jsx)(J,{})}),Object(f.jsx)(l.a,{path:"*",element:Object(f.jsx)(_,{})})]}),Object(f.jsx)(y,{})]}):Object(f.jsx)(_,{})})})},M=n(87),V=n(122),B=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SIGN_IN":return!0;case"SIGN_OUT":return!1;default:return t}},q=Object(M.a)({logged:B}),z=Object(M.b)(q,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());i.a.render(Object(f.jsx)(V.a,{store:z,children:Object(f.jsx)(L,{})}),document.getElementById("root"))}},[[153,1,2]]]);
//# sourceMappingURL=main.3d600fb6.chunk.js.map