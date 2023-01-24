"use strict";(self.webpackChunkbooking=self.webpackChunkbooking||[]).push([[461],{783:function(e,a,i){var s=i(1413),r=i(5987),l=i(1694),o=i.n(l),t=i(2791),n=i(2007),c=i.n(n),d=i(184),f=["as","className","type","tooltip"],v={type:c().string,tooltip:c().bool,as:c().elementType},m=t.forwardRef((function(e,a){var i=e.as,l=void 0===i?"div":i,t=e.className,n=e.type,c=void 0===n?"valid":n,v=e.tooltip,m=void 0!==v&&v,u=(0,r.Z)(e,f);return(0,d.jsx)(l,(0,s.Z)((0,s.Z)({},u),{},{ref:a,className:o()(t,"".concat(c,"-").concat(m?"tooltip":"feedback"))}))}));m.displayName="Feedback",m.propTypes=v,a.Z=m},3053:function(e,a,i){var s=i(1413),r=i(5987),l=i(1694),o=i.n(l),t=i(2791),n=i(323),c=i(162),d=i(184),f=["bsPrefix","className","children","controlId","label"],v=t.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,t=e.children,v=e.controlId,m=e.label,u=(0,r.Z)(e,f);return i=(0,c.vE)(i,"form-floating"),(0,d.jsxs)(n.Z,(0,s.Z)((0,s.Z)({ref:a,className:o()(l,i),controlId:v},u),{},{children:[t,(0,d.jsx)("label",{htmlFor:v,children:m})]}))}));v.displayName="FloatingLabel",a.Z=v},9461:function(e,a,i){i.d(a,{Z:function(){return M}});var s=i(1413),r=i(5987),l=i(1694),o=i.n(l),t=i(2007),n=i.n(t),c=i(2791),d=i(6239),f=i(4942),v=(i(2391),i(783)),m=i(4934),u=i(162),Z=i(184),p=["bsPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","as"],b=c.forwardRef((function(e,a){var i,l,t=e.bsPrefix,n=e.type,d=e.size,v=e.htmlSize,b=e.id,x=e.className,N=e.isValid,h=void 0!==N&&N,y=e.isInvalid,I=void 0!==y&&y,j=e.plaintext,k=e.readOnly,w=e.as,F=void 0===w?"input":w,P=(0,r.Z)(e,p),g=(0,c.useContext)(m.Z).controlId;(t=(0,u.vE)(t,"form-control"),j)?i=(0,f.Z)({},"".concat(t,"-plaintext"),!0):(l={},(0,f.Z)(l,t,!0),(0,f.Z)(l,"".concat(t,"-").concat(d),d),i=l);return(0,Z.jsx)(F,(0,s.Z)((0,s.Z)({},P),{},{type:n,size:v,ref:a,readOnly:k,id:b||g,className:o()(x,i,h&&"is-valid",I&&"is-invalid","color"===n&&"".concat(t,"-color"))}))}));b.displayName="FormControl";var x=Object.assign(b,{Feedback:v.Z}),N=(0,i(6543).Z)("form-floating"),h=i(323),y=i(2677),I=["as","bsPrefix","column","visuallyHidden","className","htmlFor"],j=c.forwardRef((function(e,a){var i=e.as,l=void 0===i?"label":i,t=e.bsPrefix,n=e.column,d=e.visuallyHidden,f=e.className,v=e.htmlFor,p=(0,r.Z)(e,I),b=(0,c.useContext)(m.Z).controlId;t=(0,u.vE)(t,"form-label");var x="col-form-label";"string"===typeof n&&(x="".concat(x," ").concat(x,"-").concat(n));var N=o()(f,t,d&&"visually-hidden",n&&x);return v=v||b,n?(0,Z.jsx)(y.Z,(0,s.Z)({ref:a,as:"label",className:N,htmlFor:v},p)):(0,Z.jsx)(l,(0,s.Z)({ref:a,className:N,htmlFor:v},p))}));j.displayName="FormLabel",j.defaultProps={column:!1,visuallyHidden:!1};var k=j,w=["bsPrefix","className","id"],F=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,t=e.id,n=(0,r.Z)(e,w),d=(0,c.useContext)(m.Z).controlId;return i=(0,u.vE)(i,"form-range"),(0,Z.jsx)("input",(0,s.Z)((0,s.Z)({},n),{},{type:"range",ref:a,className:o()(l,i),id:t||d}))}));F.displayName="FormRange";var P=F,g=["bsPrefix","size","htmlSize","className","isValid","isInvalid","id"],C=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.size,t=e.htmlSize,n=e.className,d=e.isValid,f=void 0!==d&&d,v=e.isInvalid,p=void 0!==v&&v,b=e.id,x=(0,r.Z)(e,g),N=(0,c.useContext)(m.Z).controlId;return i=(0,u.vE)(i,"form-select"),(0,Z.jsx)("select",(0,s.Z)((0,s.Z)({},x),{},{size:t,ref:a,className:o()(n,i,l&&"".concat(i,"-").concat(l),f&&"is-valid",p&&"is-invalid"),id:b||N}))}));C.displayName="FormSelect";var R=C,z=["bsPrefix","className","as","muted"],E=c.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,t=e.as,n=void 0===t?"small":t,c=e.muted,d=(0,r.Z)(e,z);return i=(0,u.vE)(i,"form-text"),(0,Z.jsx)(n,(0,s.Z)((0,s.Z)({},d),{},{ref:a,className:o()(l,i,c&&"text-muted")}))}));E.displayName="FormText";var S=E,T=c.forwardRef((function(e,a){return(0,Z.jsx)(d.Z,(0,s.Z)((0,s.Z)({},e),{},{ref:a,type:"switch"}))}));T.displayName="Switch";var V=Object.assign(T,{Input:d.Z.Input,Label:d.Z.Label}),L=i(3053),O=["className","validated","as"],H={_ref:n().any,validated:n().bool,as:n().elementType},G=c.forwardRef((function(e,a){var i=e.className,l=e.validated,t=e.as,n=void 0===t?"form":t,c=(0,r.Z)(e,O);return(0,Z.jsx)(n,(0,s.Z)((0,s.Z)({},c),{},{ref:a,className:o()(i,l&&"was-validated")}))}));G.displayName="Form",G.propTypes=H;var M=Object.assign(G,{Group:h.Z,Control:x,Floating:N,Check:d.Z,Switch:V,Label:k,Text:S,Range:P,Select:R,FloatingLabel:L.Z})},6239:function(e,a,i){i.d(a,{Z:function(){return y}});var s=i(1413),r=i(5987),l=i(1694),o=i.n(l),t=i(2791),n=i(783),c=i(4934),d=i(162),f=i(184),v=["id","bsPrefix","className","type","isValid","isInvalid","as"],m=t.forwardRef((function(e,a){var i=e.id,l=e.bsPrefix,n=e.className,m=e.type,u=void 0===m?"checkbox":m,Z=e.isValid,p=void 0!==Z&&Z,b=e.isInvalid,x=void 0!==b&&b,N=e.as,h=void 0===N?"input":N,y=(0,r.Z)(e,v),I=(0,t.useContext)(c.Z).controlId;return l=(0,d.vE)(l,"form-check-input"),(0,f.jsx)(h,(0,s.Z)((0,s.Z)({},y),{},{ref:a,type:u,id:i||I,className:o()(n,l,p&&"is-valid",x&&"is-invalid")}))}));m.displayName="FormCheckInput";var u=m,Z=["bsPrefix","className","htmlFor"],p=t.forwardRef((function(e,a){var i=e.bsPrefix,l=e.className,n=e.htmlFor,v=(0,r.Z)(e,Z),m=(0,t.useContext)(c.Z).controlId;return i=(0,d.vE)(i,"form-check-label"),(0,f.jsx)("label",(0,s.Z)((0,s.Z)({},v),{},{ref:a,htmlFor:n||m,className:o()(l,i)}))}));p.displayName="FormCheckLabel";var b=p,x=i(1701),N=["id","bsPrefix","bsSwitchPrefix","inline","reverse","disabled","isValid","isInvalid","feedbackTooltip","feedback","feedbackType","className","style","title","type","label","children","as"],h=t.forwardRef((function(e,a){var i=e.id,l=e.bsPrefix,v=e.bsSwitchPrefix,m=e.inline,Z=void 0!==m&&m,p=e.reverse,h=void 0!==p&&p,y=e.disabled,I=void 0!==y&&y,j=e.isValid,k=void 0!==j&&j,w=e.isInvalid,F=void 0!==w&&w,P=e.feedbackTooltip,g=void 0!==P&&P,C=e.feedback,R=e.feedbackType,z=e.className,E=e.style,S=e.title,T=void 0===S?"":S,V=e.type,L=void 0===V?"checkbox":V,O=e.label,H=e.children,G=e.as,M=void 0===G?"input":G,W=(0,r.Z)(e,N);l=(0,d.vE)(l,"form-check"),v=(0,d.vE)(v,"form-switch");var X=(0,t.useContext)(c.Z).controlId,_=(0,t.useMemo)((function(){return{controlId:i||X}}),[X,i]),q=!H&&null!=O&&!1!==O||(0,x.XW)(H,b),A=(0,f.jsx)(u,(0,s.Z)((0,s.Z)({},W),{},{type:"switch"===L?"checkbox":L,ref:a,isValid:k,isInvalid:F,disabled:I,as:M}));return(0,f.jsx)(c.Z.Provider,{value:_,children:(0,f.jsx)("div",{style:E,className:o()(z,q&&l,Z&&"".concat(l,"-inline"),h&&"".concat(l,"-reverse"),"switch"===L&&v),children:H||(0,f.jsxs)(f.Fragment,{children:[A,q&&(0,f.jsx)(b,{title:T,children:O}),C&&(0,f.jsx)(n.Z,{type:R,tooltip:g,children:C})]})})})}));h.displayName="FormCheck";var y=Object.assign(h,{Input:u,Label:b})},4934:function(e,a,i){var s=i(2791).createContext({});a.Z=s},323:function(e,a,i){var s=i(1413),r=i(5987),l=i(2791),o=i(4934),t=i(184),n=["controlId","as"],c=l.forwardRef((function(e,a){var i=e.controlId,c=e.as,d=void 0===c?"div":c,f=(0,r.Z)(e,n),v=(0,l.useMemo)((function(){return{controlId:i}}),[i]);return(0,t.jsx)(o.Z.Provider,{value:v,children:(0,t.jsx)(d,(0,s.Z)((0,s.Z)({},f),{},{ref:a}))})}));c.displayName="FormGroup",a.Z=c},2391:function(e){var a=function(){};e.exports=a}}]);
//# sourceMappingURL=461.81331093.chunk.js.map