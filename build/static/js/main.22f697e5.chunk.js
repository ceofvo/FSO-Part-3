(this["webpackJsonpfso-part2-the-phonebook"]=this["webpackJsonpfso-part2-the-phonebook"]||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),s=n.n(o),u=n(14),c=n(15),l=n(2),i=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.onAddName},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:e.newName,onChange:e.onNameInputChange})),r.a.createElement("div",null,"Number: ",r.a.createElement("input",{value:e.newPhone,onChange:e.onPhoneInputChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},f=function(e){var t;return t=e.filters&&e.filters.length&&""!==e.filterName?e.filters.map((function(t){return r.a.createElement("li",{key:t.id},t.name,"  ",t.number,r.a.createElement("button",{onClick:e.onDelete,value:t.id},"Delete"))})):e.persons.map((function(t){return r.a.createElement("li",{key:t.id},t.name,"  ",t.number,r.a.createElement("button",{onClick:e.onDelete,value:t.id},"Delete"))})),r.a.createElement("div",null,r.a.createElement("ul",null,t))},m=function(e){return r.a.createElement("div",null,"Filter shown with: ",r.a.createElement("input",{value:e.filterName,onChange:e.onFilterInputChange}))},d=n(3),h=n.n(d),p="/api/persons",g=function(){return h.a.get(p).then((function(e){return e.data}))},b=function(e){return h.a.post(p,e).then((function(e){return e.data}))},w=function(e,t){return h.a.put("".concat(p,"/").concat(e),t).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},E=function(e){return"success"===e.message.status?r.a.createElement("div",{className:"success"},e.message.showMessage):"error"===e.message.status?r.a.createElement("div",{className:"error"},e.message.showMessage):null};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var j=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],s=Object(a.useState)([]),d=Object(l.a)(s,2),h=d[0],p=d[1],j=Object(a.useState)(""),y=Object(l.a)(j,2),M=y[0],N=y[1],P=Object(a.useState)(""),C=Object(l.a)(P,2),k=C[0],D=C[1],S=Object(a.useState)(""),I=Object(l.a)(S,2),T=I[0],A=I[1],F=Object(a.useState)([]),x=Object(l.a)(F,2),J=x[0],L=x[1];Object(a.useEffect)((function(){g().then((function(e){o(e)})).catch((function(e){L({showMessage:e.response.data.message,status:"error"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{message:J}),r.a.createElement(m,{persons:n,filterName:T,onFilterInputChange:function(e){A(e.target.value);var t,a=Object(c.a)(n);p((t=T,a.filter((function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())}))))}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(i,{persons:n,newName:M,newPhone:k,onNameInputChange:function(e){N(e.target.value)},onPhoneInputChange:function(e){D(e.target.value)},onAddName:function(e){e.preventDefault();var t=n.find((function(e){return e.name===M}));if(void 0!==t){if(window.confirm("".concat(M," is already added to phonebook, replace the old number with a new one?"))){var a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(n,!0).forEach((function(t){Object(u.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t,{number:k});w(t.id,a).then((function(e){o(n.map((function(n){return n.id!==t.id?n:e}))),N(""),D(""),L({showMessage:"".concat(t.name," updated"),status:"success"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3)})).catch((function(e){L({showMessage:"Phone details of '".concat(t.name,"' was already removed from server"),status:"error"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3),o(n.filter((function(e){return e.id!==t.id})))}))}}else{var r={name:M,number:k};b(r).then((function(e){o(n.concat(e)),N(""),D(""),L({showMessage:"Added ".concat(r.name),status:"success"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3)})).catch((function(e){console.log(e.response.data);var t=e.response.data;L({showMessage:"".concat(t),status:"error"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3)}))}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{persons:n,filters:h,filterName:T,onDelete:function(e){var t=e.target.value,a=n.find((function(e){return e.id===t}));if(void 0!==a&&window.confirm("Delete ".concat(a.name," ?"))){var r=n.filter((function(e){return e.id!==t}));v(t).then((function(e){o(r),L({showMessage:"".concat(a.name," deleted successfully"),status:"success"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3)})).catch((function(e){L({showMessage:"Phone details of '".concat(a.name,"' was already removed from server"),status:"error"}),setTimeout((function(){L({showMessage:null,status:"null"})}),5e3),o(n.filter((function(e){return e.id!==a.id})))}))}}}))};n(38);s.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.22f697e5.chunk.js.map