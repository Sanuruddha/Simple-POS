(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),c=a.n(l),i=a(7),s=a(8),o=a(10),m=a(9),u=a(11),d=(a(63),a(64),a(116)),p=a(133),h=a(16),b=a(117),f=a(119),g=a(120),E=a(121),O=a(122),v=a(123),y=a(13),j=a(15),L=a.n(j),C=a(18),T=function(){return function(e){return e(N()),L.a.get("/api/items").then(function(t){return e({type:"GET_ITEMS",payload:t.data})})}},N=function(){return{type:"ITEMS_LOADING"}},w=a(3),I=a.n(w),k=a(17),_=a(106),S=a(107),x=a(108),A=a(109),D=a(110),M=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={name:"",description:"",price:0,avatar:""},a.handleChange=function(e){a.setState(Object(k.a)({},e.target.name,e.target.value))},a.showToast=function(e,t){return Object(C.toast)(e,{type:t,autoClose:2e3,hideProgressBar:!0})},a.handleSubmit=function(e){e.preventDefault(),console.log(typeof a.state.avatar);var t=new FormData;return!a.state.name.length>0?a.showToast("Invalid item name","error"):(t.append("name",a.state.name),!a.state.description.length>0?a.showToast("Invalid item description","error"):(t.append("description",a.state.description),0===a.state.price?a.showToast("Invalid item price","error"):(t.append("price",100*a.state.price),a.state.avatar?(t.append("avatar",a.state.avatar),a.props.addItem(t),void a.setState({name:"",description:"",price:0,avatar:""})):a.showToast("Invalid item image","error"))))},a.getPhoto=function(e){e.preventDefault(),a.setState({avatar:e.target.files[0]})},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(_.a,{className:"order-form",onSubmit:this.handleSubmit.bind(this)},r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleText"},"Name"),r.a.createElement(A.a,{value:this.state.name,onChange:this.handleChange.bind(this),type:"text",name:"name",id:"exampleText",placeholder:"Enter Name"})),r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleText"},"Description"),r.a.createElement(A.a,{value:this.state.description,onChange:this.handleChange.bind(this),type:"tel",name:"description",id:"exampleText",placeholder:"Add description"})),r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleText"},"Price"),r.a.createElement(A.a,{value:this.state.price,onChange:this.handleChange.bind(this),type:"number",name:"price",id:"exampleText",placeholder:"Price"})),r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleText"},"Add Image (400 x 266)"),r.a.createElement("br",null),r.a.createElement("input",{onChange:this.getPhoto.bind(this),type:"file",id:"avatar",name:"avatar",accept:"image/png, image/jpeg"})),r.a.createElement(D.a,null,"Submit"))}}]),t}(n.Component),P=Object(y.b)(function(e){return{}},{addItem:function(e){return function(t){return L.a.post("/api/items",e).then(function(e){t({type:"ADD_ITEM",payload:e.data}),Object(C.toast)("Item added successfully",{type:"success",autoClose:2e3,hideProgressBar:!0})})}}})(M),G="openOrders",B="items",U=function(e,t){return{type:"CHANGE_ACTIVE_TAB",payload:{fromTab:e,ToTab:t}}},R=a(115),W=a(118),F=a(22),H=a(12),V=a(25),X=a(111),J=a(112),z=a(113),K=a(114),Q=a(55),Y=function(){return{type:"LISTS_LOADING"}},$=function(e,t){return function(a){return L.a.put("/api/lists/".concat(e,"/").concat(t)).then(function(t){a({type:"UPDATE_LIST",payload:{items:t.data,id:e}})})}},q=function(e){return{type:"UPDATE_NEW_LIST",payload:e}},Z=a(56),ee=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={open:!1,name:"",description:""},a.toggle=function(){a.setState({open:!a.state.open})},a.addToList=function(){if(a.props.tab.openOrders&&a.props.addToList(a.props.list.selectedList,a.props.selfItem._id),a.props.tab.newOrder){var e=[];e=a.props.list.newList.items.map(function(e){return e.id}).indexOf(a.props.selfItem._id)>-1?a.props.list.newList.items.map(function(e){return e.id===a.props.selfItem._id&&e.count++,e}):[].concat(Object(V.a)(a.props.list.newList.items),[{id:a.props.selfItem._id,count:1}]),a.props.updateNewList(Object(H.a)({},a.props.list.newList,{items:e}))}},a.onChangeInput=a.onChangeInput.bind(Object(h.a)(Object(h.a)(a))),a.toggle=a.toggle.bind(Object(h.a)(Object(h.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"onChangeInput",value:function(e){this.setState(Object(k.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){var e=this.props.selfItem;return r.a.createElement("div",null,r.a.createElement(X.a,null,r.a.createElement(Q.a,{style:{color:"#ffffff",backgroundColor:"#8b918b",padding:"5px"}},r.a.createElement(J.a,null,r.a.createElement("h6",null,e.name.toUpperCase()))),r.a.createElement(z.a,{top:!0,className:"p-1 crop",src:"/img/".concat(e.imgPath),alt:"Card image cap"}),r.a.createElement(K.a,{className:"p-1"},r.a.createElement(Z.a,{className:"p-1 mb-1"},(e.price/100).toFixed(2)+" LKR"),r.a.createElement(D.a,{className:"add-btn",color:"success",onClick:this.addToList.bind(this)},r.a.createElement("i",{className:"fa fa-plus"})))))}}]),t}(n.Component),te=Object(y.b)(function(e){return{list:e.list,tab:e.tab}},{addToList:$,updateNewList:q})(ee),ae=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props.item,t=e.items;return e.loading?r.a.createElement(b.a,null,r.a.createElement(W.a,{style:{width:"3rem",height:"3rem"}})):t.length>0?r.a.createElement(R.a,null,r.a.createElement(d.a,{className:"item-grid-wrapper"},t.map(function(e){return r.a.createElement(b.a,{className:"limited-padding",key:e._id,sm:"12",md:"6",lg:"3"},r.a.createElement(F.TransitionGroup,{className:"shopping-list"},r.a.createElement(F.CSSTransition,{key:e._id,timeout:500,classNames:"fade"},r.a.createElement(te,{selfItem:e}))))}))):r.a.createElement(b.a,null,r.a.createElement("h4",null,"No items to display"))}}]),t}(n.Component),ne=Object(y.b)(function(e){return{item:e.item}},{})(ae),re=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).toggle=a.toggle.bind(Object(h.a)(Object(h.a)(a))),a.state={activeTab:B},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getItems()}},{key:"toggle",value:function(e){this.state.activeTab!==e&&(this.props.changeActiveTab(this.state.activeTab,e),this.setState({activeTab:e}))}},{key:"render",value:function(){var e=this;return r.a.createElement(b.a,{style:{paddingLeft:"0",paddingRight:"0"},className:"custom-grid"},r.a.createElement(f.a,{tabs:!0},r.a.createElement(g.a,null,r.a.createElement(E.a,{className:I()({active:this.state.activeTab===B},"nav-link"),onClick:function(){e.toggle(B)}},r.a.createElement("h3",null,r.a.createElement("strong",null,"Items")))),r.a.createElement(g.a,null,r.a.createElement(E.a,{className:I()({active:"newItem"===this.state.activeTab},"nav-link"),onClick:function(){e.toggle("newItem")}},r.a.createElement("h3",null,r.a.createElement("strong",null,"Item Management"))))),r.a.createElement(O.a,{activeTab:this.state.activeTab},r.a.createElement(v.a,{tabId:B},r.a.createElement(d.a,null,r.a.createElement(b.a,{sm:"12"},r.a.createElement(ne,null)))),r.a.createElement(v.a,{tabId:"newItem"},r.a.createElement(d.a,null,r.a.createElement(b.a,{sm:"12"},r.a.createElement(P,null))))))}}]),t}(n.Component),le=Object(y.b)(function(e){return{}},{getItems:T,deleteItem:function(e){return function(t){return L.a.delete("/api/items/".concat(e)).then(function(a){t({type:"DELETE_ITEM",payload:e}),Object(C.toast)("Item deleted successfully",{type:"success",autoClose:2e3,hideProgressBar:!0})})}},changeActiveTab:U})(re),ce=a(124),ie=a(125),se=a(126),oe=a(127),me=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).toggle=a.toggle.bind(Object(h.a)(Object(h.a)(a))),a.state={isOpen:!1},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){return r.a.createElement(ce.a,{dark:!0,expand:"sm",className:"mb-5 nav-bar custom-nav"},r.a.createElement(ie.a,{href:"/"},r.a.createElement("img",{alt:"Logo",src:"/img/logo2.png",width:"100"}),r.a.createElement("h1",null,"Simple POS")),r.a.createElement(se.a,{onClick:this.toggle}),r.a.createElement(oe.a,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(f.a,{className:"ml-auto",navbar:!0},r.a.createElement(g.a,null,this.props.auth.loggedIn?r.a.createElement(E.a,{href:"/logout"},"Logout"):""))))}}]),t}(n.Component),ue=Object(y.b)(function(e){return{auth:e.auth}},{})(me),de=a(28),pe=Object(de.a)({}),he=function(e){e?L.a.defaults.headers.common.Authorization=e:delete L.a.defaults.headers.common.Authorization},be=function(e){return function(t){return he(e),L.a.get("/api/users/current").then(function(a){if(200===a.status){localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(a.data)),pe.push("/dashboard");var n=200===a.status;t({type:"LOGGED_IN",payload:{token:e,user:a.data,loggedIn:n}})}}).catch()}},fe=a(132),ge=a(128),Ee=a(129),Oe=a(130),ve=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).toggleModal=function(){a.props.toggle()},a.handleConfirmation=function(){a.props.onConfirm(),a.toggleModal()},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(fe.a,{isOpen:this.props.isOpen,toggle:this.toggleModal.bind(this)},r.a.createElement(ge.a,{toggle:this.toggleModal.bind(this)},this.props.modalHeader),r.a.createElement(Ee.a,null,this.props.modalBodyText),r.a.createElement(Oe.a,null,r.a.createElement(D.a,{color:this.props.cancelColor,onClick:this.toggleModal.bind(this)},this.props.modalCancelLabel),r.a.createElement(D.a,{color:this.props.confirmColor,onClick:this.handleConfirmation.bind(this)},this.props.modalConfirmationLabel)," ")))}}]),t}(r.a.Component),ye=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).toggleModal=function(){a.props.toggle()},a.addItemToList=function(e,t){a.props.addToList(e,t)},a.removeItemFromList=function(e,t){a.props.removeFromList(e,t)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=0;return r.a.createElement("div",null,r.a.createElement(fe.a,{centered:!0,fade:!1,isOpen:this.props.isOpen,toggle:this.toggleModal.bind(this)},r.a.createElement(ge.a,{toggle:this.toggleModal.bind(this)},this.props.modalHeader),r.a.createElement(Ee.a,null,r.a.createElement("table",{style:{width:"100%"}},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{style:{paddingLeft:"0.2rem"}},"Item"),r.a.createElement("th",{className:"text-right"},"Count"),r.a.createElement("th",{className:"text-right"},"Price"),r.a.createElement("th",{className:"text-right"},"Add/Remove")),this.props.items.map(function(a){return t+=a.price*a.count/100,r.a.createElement("tr",{key:a._id},r.a.createElement("td",{style:{paddingLeft:"0.5rem"}},a.name.charAt(0).toUpperCase()+a.name.slice(1)),r.a.createElement("td",{className:"text-right"},a.count),r.a.createElement("td",{className:"text-right"},(a.price*a.count/100).toFixed()),r.a.createElement("td",{className:"text-right"},r.a.createElement("button",{style:{width:"40%",marginRight:"0.2rem"},className:"plus-button btn btn-success suc",type:"button",value:"plus",onClick:e.addItemToList.bind(e,e.props.id,a.id)},r.a.createElement("i",{className:"fa fa-plus"})),r.a.createElement("button",{style:{width:"40%"},className:"minus-button btn btn-danger dan",type:"button",value:"minus",onClick:e.removeItemFromList.bind(e,e.props.id,a.id)},r.a.createElement("i",{className:"fa fa-minus"}))))}),r.a.createElement("tr",null,r.a.createElement("td",{colspan:"4",className:"text-right"},r.a.createElement("b",null,"Total :",t.toString())))))),r.a.createElement(Oe.a,null,r.a.createElement(D.a,{color:this.props.cancelColor,onClick:this.toggleModal.bind(this)},this.props.modalCancelLabel))))}}]),t}(r.a.Component),je=Object(y.b)(function(e){return{}},{addToList:$,removeFromList:function(e,t){return function(a){return L.a.delete("/api/lists/".concat(e,"/").concat(t)).then(function(t){a({type:"UPDATE_LIST",payload:{items:t.data,id:e}})})}}})(ye),Le=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={confirmationModal:!1,orderListModal:!1,checkoutConformationModal:!1},a.toggle=function(){a.setState(function(e){return{confirmationModal:!e.confirmationModal}})},a.toggleCheckout=function(){a.setState(function(e){return{checkoutConformationModal:!e.checkoutConformationModal}})},a.toggleOrderModal=function(){a.setState(function(e){return{orderListModal:!e.orderListModal}})},a.onDeleteClick=function(){console.log("deleting"),a.props.removeList(a.props.id)},a.onCheckoutClick=function(){var e=a.props.list.lists.filter(function(e){return e._id===a.props.id})[0];a.props.closeList(Object(H.a)({},e,{status:1}))},a.setActiveList=function(e){a.props.setActiveList(e)},a.openOrder=function(){a.toggleOrderModal()},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=this.props.list.lists,a=this.props.id,n=this.props.name,l=t.filter(function(e){return e._id===a})[0].items.map(function(t){var a=e.props.item.items.filter(function(e){return e._id===t.id})[0];return!!a&&Object(H.a)({},t,{price:a.price,name:a.name})}).filter(function(e){return!1!==e}),c=0;return l.length>0&&(c=l.map(function(e){return e.price*e.count/100}).reduce(function(e,t){return e+t},0).toFixed(2)),r.a.createElement(b.a,{className:"limited-padding",sm:"4"},r.a.createElement("div",{onClick:this.setActiveList.bind(this,a),className:I()({active_list:this.props.activeList===a},"card")},r.a.createElement("div",{className:"card-body-wrapper"},r.a.createElement(je,{id:a,isOpen:this.state.orderListModal,toggle:this.toggleOrderModal.bind(this),modalBodyText:"Opened Order",modalHeader:n,modalConfirmationLabel:"Delete",modalCancelLabel:"Close",cancelColor:"secondary",confirmColor:"danger",items:l}),r.a.createElement("div",{className:".card-header:first-child",style:{color:"#ffffff",backgroundColor:"#8b918b",padding:"5px"}},r.a.createElement("h5",null,n)),r.a.createElement("table",{className:"m-1 border"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{style:{width:"50%"},className:"text-left"},"Item"),r.a.createElement("th",{style:{width:"10%"},className:"text-right"},"Qty"),r.a.createElement("th",{style:{width:"40%"},className:"text-right"},"Price")),l.map(function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",{style:{width:"50%"},className:"text-left"},e.name.charAt(0).toUpperCase()+e.name.slice(1)),r.a.createElement("td",{style:{width:"10%"},className:"text-right"},e.count),r.a.createElement("td",{style:{width:"40%"},className:"text-right"},(e.price*e.count/100).toFixed(2)))})))),r.a.createElement("p",{className:"price",style:{color:"#000000"}}," ",c," LKR"),r.a.createElement("button",{className:"suc ml-1 mr-1 mt-1 view-btn",onClick:this.openOrder.bind(this)},r.a.createElement("span",{className:"icon-span"},"View")),r.a.createElement("div",{className:"card-button-wrapper m-1"},r.a.createElement("span",{className:"card-button"},r.a.createElement("div",null,r.a.createElement("button",{className:"suc",onClick:this.toggleCheckout.bind(this)},r.a.createElement("span",{role:"img",className:"icon-span","aria-label":"Check"},r.a.createElement("i",{className:"fa fa-check"}))),r.a.createElement(ve,{onConfirm:this.onCheckoutClick.bind(this),isOpen:this.state.checkoutConformationModal,toggle:this.toggleCheckout.bind(this),modalBodyText:"Are you sure you want to check out this order?",modalHeader:"Confirmation",modalConfirmationLabel:"Checkout",modalCancelLabel:"Cancel",cancelColor:"secondary",confirmColor:"success"}))),r.a.createElement("span",{className:"card-button"},r.a.createElement("div",null,r.a.createElement("button",{className:"dan",onClick:this.toggle.bind(this)},r.a.createElement("span",{className:"icon-span"},r.a.createElement("i",{className:"fa fa-times"}))),r.a.createElement(ve,{onConfirm:this.onDeleteClick.bind(this),isOpen:this.state.confirmationModal,toggle:this.toggle.bind(this),modalBodyText:"You are about to delete an Order List. Are you sure you want to delete?",modalHeader:"Confirmation",modalConfirmationLabel:"Delete",modalCancelLabel:"Cancel",cancelColor:"secondary",confirmColor:"danger"}))))))}}]),t}(n.Component),Ce=Object(y.b)(function(e){return{item:e.item,list:e.list}},{getItems:T,removeList:function(e){return function(t){return L.a.delete("/api/lists/".concat(e)).then(function(e){t({type:"DELETE_LIST",payload:e.data._id}),Object(C.toast)("List deleted successfully",{type:"success",autoClose:2e3,hideProgressBar:!0})})}},closeList:function(e){return function(t){return L.a.put("/api/lists",e).then(function(e){t({type:"DELETE_LIST",payload:e.data._id}),t({type:"ADD_LIST",payload:e.data}),Object(C.toast)("List checked out successfully",{type:"success",autoClose:2e3,hideProgressBar:!0})}).catch()}}})(Le),Te=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={activeList:""},a.setActiveList=function(e){a.setState({activeList:e}),a.props.selectList(e)},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.props.getLists(this.props.auth.user.id)}},{key:"render",value:function(){var e=this,t=this.props.list,a=t.lists,n=t.loading,l=[];return a&&(l=a.filter(function(e){return 1!==e.status&&e.items.length>0})),n?r.a.createElement(b.a,null,r.a.createElement(W.a,{style:{width:"3rem",height:"3rem"}})):a.length>0?r.a.createElement(b.a,null,r.a.createElement(d.a,{className:"order-grid"},l.map(function(t){var a=t._id,n=t.name;return r.a.createElement(Ce,{activeList:e.state.activeList,key:a,name:n,id:a,setActiveList:e.setActiveList})}))):r.a.createElement(b.a,null,r.a.createElement("h4",null,"No lists to display"))}}]),t}(n.Component),Ne=Object(y.b)(function(e){return{list:e.list,auth:e.auth}},{getLists:function(e){return function(t){return t(Y()),L.a.get("/api/lists/user/".concat(e)).then(function(e){return t({type:"GET_LISTS",payload:e.data})})}},selectList:function(e){return{type:"SELECT_LIST",payload:e}}})(Te),we=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleChange=function(e){a.props.updateNewList(Object(H.a)({},a.props.list.newList,Object(k.a)({},e.target.name,e.target.value)))},a.showToast=function(e,t){return Object(C.toast)(e,{type:t,autoClose:2e3,hideProgressBar:!0})},a.handleSubmit=function(e){return e.preventDefault(),!a.props.list.newList.name.length>0?a.showToast("Invalid list name","error"):!a.props.list.newList.items.length>0?a.showToast("Number of items in the list cannot be 0","error"):void a.props.createList(a.props.list.newList)},a.handleClear=function(e){e.preventDefault(),a.props.clearList(a.props.list.newList)},a.handleIncrement=function(e,t){t.preventDefault();var n=[];a.props.list.newList.items.map(function(e){return e.id}).indexOf(e)>-1&&(n=a.props.list.newList.items.map(function(t){return t.id===e&&t.count++,t})),a.props.updateNewList(Object(H.a)({},a.props.list.newList,{items:n}))},a.handleDecrement=function(e,t){t.preventDefault();var n=a.props.list.newList.items.map(function(e){return e.id}).indexOf(e),r=Object(V.a)(a.props.list.newList.items);n>-1&&(r[n].count>1?r[n].count--:1===r[n].count&&r.splice(n,1)),a.props.updateNewList(Object(H.a)({},a.props.list.newList,{items:r}))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=0,a=0;return r.a.createElement(_.a,{className:"order-form"},r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleText"},"Customer Name"),r.a.createElement(A.a,{value:this.props.list.newList.name,onChange:this.handleChange.bind(this),type:"text",name:"name",id:"exampleText",placeholder:"Enter Name"})),r.a.createElement(S.a,null,r.a.createElement(x.a,{for:"exampleSelect"},"Add Items"),r.a.createElement("div",{className:"custom-table"},r.a.createElement("table",{className:"table"},r.a.createElement("thead",{className:"thead-light"},r.a.createElement("tr",null,r.a.createElement("th",{scope:"col",className:"td-left"},"#"),r.a.createElement("th",{scope:"col",className:"td-left"},"Item"),r.a.createElement("th",{scope:"col",className:"td-right"},"Count"),r.a.createElement("th",{scope:"col",className:"td-right"},"Price"),r.a.createElement("th",{scope:"col",className:"td-right"},"+/-"))),r.a.createElement("tbody",null,this.props.list.newList.items.map(function(t){var a=e.props.item.items.filter(function(e){return e._id===t.id})[0];return Object(H.a)({},a,{count:t.count})}).map(function(n){return a+=n.price*n.count/100,r.a.createElement("tr",{key:n._id},r.a.createElement("th",{scope:"row",className:"td-left"},++t),r.a.createElement("td",{className:"td-left"},n.name),r.a.createElement("td",{className:"td-right"},n.count),r.a.createElement("td",{className:"td-right"},n.price*n.count/100),r.a.createElement("td",{className:"td-right"},r.a.createElement("button",{style:{width:"40%",marginRight:"0.2rem"},className:"minus-button btn btn-success suc",onClick:e.handleIncrement.bind(e,n._id)},r.a.createElement("i",{className:"fa fa-plus"})),r.a.createElement("button",{style:{width:"40%"},className:"minus-button btn btn-danger dan",onClick:e.handleDecrement.bind(e,n._id)},r.a.createElement("i",{className:"fa fa-minus"}))))}),r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{scope:"col",className:"td-right"},a?"Total":""),r.a.createElement("th",{scope:"col",className:"td-right"},a||"")),r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{scope:"col"},""),r.a.createElement("th",{colSpan:2,scope:"col",style:{padding:"2rem 0 0 0"},className:"td-right"},r.a.createElement(D.a,{style:{border:"0",width:"40%",marginRight:"0.2rem"},className:"dan",onClick:this.handleClear.bind(this)},"Clear"),r.a.createElement(D.a,{style:{border:"0",width:"40%"},className:"suc",onClick:this.handleSubmit.bind(this)},"Submit"))))))))}}]),t}(n.Component),Ie=Object(y.b)(function(e){return{list:e.list,item:e.item}},{updateNewList:q,createList:function(e){return function(t){return t({type:"CLEAR_NEW_LIST"}),L.a.post("/api/lists",e).then(function(e){t({type:"ADD_LIST",payload:e.data}),Object(C.toast)("List added successfully",{type:"success",autoClose:2e3,hideProgressBar:!0})})}},clearList:function(){return{type:"CLEAR_NEW_LIST"}}})(we),ke=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(Ie,null)}}]),t}(n.Component),_e=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).toggle=a.toggle.bind(Object(h.a)(Object(h.a)(a))),a.state={activeTab:G},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"toggle",value:function(e){this.state.activeTab!==e&&(this.props.changeActiveTab(this.state.activeTab,e),this.setState({activeTab:e}))}},{key:"render",value:function(){var e=this;return r.a.createElement(b.a,{style:{paddingLeft:"0",paddingRight:"0"},className:"custom-grid"},r.a.createElement(f.a,{tabs:!0},r.a.createElement(g.a,null,r.a.createElement(E.a,{className:I()({active:this.state.activeTab===G},"nav-link"),onClick:function(){e.toggle(G)}},r.a.createElement("h3",null,r.a.createElement("strong",null,"Open Orders")))),r.a.createElement(g.a,null,r.a.createElement(E.a,{className:I()({active:"newOrder"===this.state.activeTab},"nav-link"),onClick:function(){e.toggle("newOrder")}},r.a.createElement("h3",null,r.a.createElement("strong",null,"New Order"))))),r.a.createElement(O.a,{activeTab:this.state.activeTab},r.a.createElement(v.a,{tabId:G},r.a.createElement(d.a,null,r.a.createElement(b.a,{sm:"12"},r.a.createElement(Ne,null)))),r.a.createElement(v.a,{tabId:"newOrder"},r.a.createElement(d.a,null,r.a.createElement(b.a,{sm:"12"},r.a.createElement(ke,null))))))}}]),t}(r.a.Component),Se=Object(y.b)(function(e){return{item:e.item,list:e.list}},{changeActiveTab:U})(_e),xe=(a(100),function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("token");e?this.props.authenticateWithToken(e):this.props.history.push("/login")}},{key:"render",value:function(){return this.props.auth.loggedIn?r.a.createElement("div",null,r.a.createElement(ue,null),r.a.createElement(C.ToastContainer,{newestOnTop:!0,pauseOnFocusLoss:!1}),r.a.createElement(d.a,{style:{marginRight:"0",marginLeft:"0"}},r.a.createElement(Se,null),r.a.createElement(le,null))):r.a.createElement(p.a,{to:"/login"})}}]),t}(n.Component)),Ae=Object(y.b)(function(e){return{auth:e.auth}},{authenticateWithToken:be,getItems:T})(xe),De=(a(52),function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(o.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={username:"",password:""},a.handleSubmit=function(e){e.preventDefault(),a.props.authenticate(a.state),pe.push("/dashboard")},a.handleChange=function(e){a.setState(Object(k.a)({},e.target.name,e.target.value))},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("token");e?this.props.authenticateWithToken(e):this.props.history.push("/login")}},{key:"render",value:function(){return this.props.auth.loggedIn?r.a.createElement(p.a,{to:"/dashboard"}):r.a.createElement("div",null,r.a.createElement(ue,null),r.a.createElement(R.a,{style:{maxWidth:"30rem",minWidth:"20rem"},className:"App col-6"},r.a.createElement("h2",{style:{textAlign:"center",paddingTop:"6rem"}},"Sign In"),r.a.createElement(_.a,{className:"form"},r.a.createElement(d.a,{className:"added-padding"},r.a.createElement(S.a,{style:{width:"100%"}},r.a.createElement(x.a,null,"Username"),r.a.createElement(A.a,{type:"text",name:"username",placeholder:"Username",onChange:this.handleChange.bind(this)}))),r.a.createElement(d.a,{className:"added-padding"},r.a.createElement(S.a,{style:{width:"100%"}},r.a.createElement(x.a,{for:"examplePassword"},"Password"),r.a.createElement(A.a,{type:"password",name:"password",id:"examplePassword",placeholder:"********",onChange:this.handleChange.bind(this)}))),r.a.createElement(d.a,{className:"added-padding"},r.a.createElement(D.a,{style:{width:"100%"},onClick:this.handleSubmit.bind(this)},"Login")))))}}]),t}(n.Component)),Me=Object(y.b)(function(e){return{auth:e.auth}},{authenticate:function(e){return function(t){return L.a.post("/api/users/authenticate",e).then(function(e){he(e.data.token),t(be(e.data.token))}).catch()}},authenticateWithToken:be})(De),Pe=a(134),Ge=a(131),Be=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentWillMount",value:function(){this.props.logout()}},{key:"render",value:function(){return r.a.createElement(p.a,{to:"/"})}}]),t}(n.Component),Ue=Object(y.b)(function(e){return{auth:e.auth}},{logout:function(){return localStorage.removeItem("token"),localStorage.removeItem("user"),he(),{type:"LOGGED_OUT"}}})(Be),Re=(a(102),function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(Pe.a,{history:pe},r.a.createElement("div",null,r.a.createElement(Ge.a,{exact:!0,path:"/",component:Ae}),r.a.createElement(Ge.a,{path:"/login",component:Me}),r.a.createElement(Ge.a,{path:"/dashboard",component:Ae}),r.a.createElement(Ge.a,{path:"/logout",component:Ue})))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var We=a(26),Fe=a(57),He={items:[],loading:!1},Ve={loggedIn:!1,user:{},loading:!1,token:""},Xe={lists:[],loading:!1,selectedList:null,newList:{name:"",status:0,items:[]}},Je={openOrders:!0,newOrder:!1,items:!0,newItem:!1},ze=Object(We.c)({item:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:He,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ITEMS":return Object(H.a)({},e,{items:t.payload,loading:!1});case"DELETE_ITEM":return Object(H.a)({},e,{items:e.items.filter(function(e){return e._id!==t.payload})});case"ADD_ITEM":return Object(H.a)({},e,{items:[].concat(Object(V.a)(e.items),[t.payload])});case"ITEMS_LOADING":return Object(H.a)({},e,{loading:!0});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGGED_IN":return Object(H.a)({},e,{token:t.payload.token,user:t.payload.user,loggedIn:t.payload.loggedIn});case"LOGGED_OUT":return Object(H.a)({},e,{token:"",user:{},loggedIn:!1,loading:!1});case"AUTH_LOADING":return Object(H.a)({},e,{loading:!0});default:return e}},list:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_NEW_LIST":return Object(H.a)({},e,{newList:t.payload});case"GET_LISTS":return Object(H.a)({},e,{lists:t.payload,loading:!1});case"DELETE_LIST":return Object(H.a)({},e,{lists:e.lists.filter(function(e){return e._id!==t.payload})});case"ADD_LIST":return Object(H.a)({},e,{lists:[].concat(Object(V.a)(e.lists),[t.payload])});case"LISTS_LOADING":return Object(H.a)({},e,{loading:!0});case"SELECT_LIST":return Object(H.a)({},e,{selectedList:t.payload});case"UPDATE_LIST":return Object(H.a)({},e,{lists:e.lists.map(function(e){return e._id===t.payload.id?Object(H.a)({},e,{items:t.payload.items}):e})});case"CLEAR_NEW_LIST":return Object(H.a)({},e,{newList:{name:"",status:0,items:[]}});default:return e}},tab:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Je,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"CHANGE_ACTIVE_TAB":return Object(H.a)({},t,(e={},Object(k.a)(e,a.payload.fromTab,!1),Object(k.a)(e,a.payload.ToTab,!0),e));default:return t}}}),Ke=[Fe.a],Qe=Object(We.e)(ze,{},Object(We.d)(We.a.apply(void 0,Ke),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));c.a.render(r.a.createElement(y.a,{store:Qe},r.a.createElement(Re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},52:function(e,t,a){},58:function(e,t,a){e.exports=a(103)},64:function(e,t,a){}},[[58,1,2]]]);
//# sourceMappingURL=main.4a800d9b.chunk.js.map