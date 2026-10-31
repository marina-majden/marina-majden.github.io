import{a as e}from"./rolldown-runtime-Cn8xt2Gj.js";import{i as t,r as n,t as r}from"./vendor-CPadXvLK.js";import{B as i,C as a,D as o,E as s,F as c,G as l,H as u,I as d,K as f,L as p,M as m,N as h,O as ee,P as g,R as _,S as v,T as y,U as b,V as x,W as S,_ as te,b as C,c as w,d as T,f as E,g as D,h as ne,i as O,j as k,l as A,m as j,n as re,r as M,s as N,t as ie,u as P,v as F,w as I,x as L,y as R,z}from"./three.module-DZo0Qlid.js";var B=e(t(),1),V={type:`change`},H={type:`start`},U={type:`end`},W=new h,ae=new o,oe=Math.cos(70*C.DEG2RAD),G=new l,K=2*Math.PI,q={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},J=1e-6,se=class extends T{constructor(e,t=null){super(e,t),this.state=q.NONE,this.target=new l,this.cursor=new l,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:R.ROTATE,MIDDLE:R.DOLLY,RIGHT:R.PAN},this.touches={ONE:x.ROTATE,TWO:x.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new l,this._lastQuaternion=new k,this._lastTargetPosition=new l,this._quat=new k().setFromUnitVectors(e.up,new l(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new i,this._sphericalDelta=new i,this._scale=1,this._panOffset=new l,this._rotateStart=new S,this._rotateEnd=new S,this._rotateDelta=new S,this._panStart=new S,this._panEnd=new S,this._panDelta=new S,this._dollyStart=new S,this._dollyEnd=new S,this._dollyDelta=new S,this._dollyDirection=new l,this._mouse=new S,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=le.bind(this),this._onPointerDown=ce.bind(this),this._onPointerUp=ue.bind(this),this._onContextMenu=_e.bind(this),this._onMouseWheel=pe.bind(this),this._onKeyDown=me.bind(this),this._onTouchStart=he.bind(this),this._onTouchMove=ge.bind(this),this._onMouseDown=de.bind(this),this._onMouseMove=fe.bind(this),this._interceptControlDown=ve.bind(this),this._interceptControlUp=ye.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(V),this.update(),this.state=q.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;G.copy(t).sub(this.target),G.applyQuaternion(this._quat),this._spherical.setFromVector3(G),this.autoRotate&&this.state===q.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=K:n>Math.PI&&(n-=K),r<-Math.PI?r+=K:r>Math.PI&&(r-=K),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(G.setFromSpherical(this._spherical),G.applyQuaternion(this._quatInverse),t.copy(this.target).add(G),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=G.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new l(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new l(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=G.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(W.origin.copy(this.object.position),W.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(W.direction))<oe?this.object.lookAt(this.target):(ae.setFromNormalAndCoplanarPoint(this.object.up,this.target),W.intersectPlane(ae,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>J||8*(1-this._lastQuaternion.dot(this.object.quaternion))>J||this._lastTargetPosition.distanceToSquared(this.target)>J?(this.dispatchEvent(V),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?K/60/60*this.autoRotateSpeed:K/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){G.setFromMatrixColumn(t,0),G.multiplyScalar(-e),this._panOffset.add(G)}_panUp(e,t){this.screenSpacePanning===!0?G.setFromMatrixColumn(t,1):(G.setFromMatrixColumn(t,0),G.crossVectors(this.object.up,G)),G.multiplyScalar(e),this._panOffset.add(G)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;G.copy(r).sub(this.target);let i=G.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(K*this._rotateDelta.x/t.clientHeight),this._rotateUp(K*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(K*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-K*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(K*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-K*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(K*this._rotateDelta.x/t.clientHeight),this._rotateUp(K*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new S,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ce(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function le(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function ue(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(U),this.state=q.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function de(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case R.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=q.DOLLY;break;case R.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=q.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=q.ROTATE}break;case R.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=q.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=q.PAN}break;default:this.state=q.NONE}this.state!==q.NONE&&this.dispatchEvent(H)}function fe(e){switch(this.state){case q.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case q.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case q.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function pe(e){this.enabled===!1||this.enableZoom===!1||this.state!==q.NONE||(e.preventDefault(),this.dispatchEvent(H),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(U))}function me(e){this.enabled!==!1&&this._handleKeyDown(e)}function he(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case x.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=q.TOUCH_ROTATE;break;case x.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=q.TOUCH_PAN;break;default:this.state=q.NONE}break;case 2:switch(this.touches.TWO){case x.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=q.TOUCH_DOLLY_PAN;break;case x.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=q.TOUCH_DOLLY_ROTATE;break;default:this.state=q.NONE}break;default:this.state=q.NONE}this.state!==q.NONE&&this.dispatchEvent(H)}function ge(e){switch(this._trackPointer(e),this.state){case q.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case q.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case q.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case q.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=q.NONE}}function _e(e){this.enabled!==!1&&e.preventDefault()}function ve(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function ye(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var Y={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},X=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},be=new y(-1,1,1,-1,0,1),xe=new class extends N{constructor(){super(),this.setAttribute(`position`,new j([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new j([0,2,0,0,2,0],2))}},Z=class{constructor(e){this._mesh=new L(xe,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Se=class extends X{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof z?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=b.clone(e.uniforms),this.material=new z({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Z(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ce=class extends X{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},we=class extends X{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Te=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new S);this._width=n.width,this._height=n.height,t=new f(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:D}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Se(Y),this.copyPass.material.blending=0,this.timer=new u}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ce!==void 0&&(r instanceof Ce?n=!0:r instanceof we&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new S);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ee=class extends X{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new A}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},De={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new A(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Q=class e extends X{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new S(256,256):new S(e.x,e.y),this.clearColor=new A(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new f(i,a,{type:D}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new f(i,a,{type:D});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new f(i,a,{type:D});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=De;this.highPassUniforms=b.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new z({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new S(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1),new l(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=b.clone(Y.uniforms),this.blendMaterial=new z({uniforms:this.copyUniforms,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new A,this._oldClearAlpha=1,this._basic=new v,this._fsQuad=new Z(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new S(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new z({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new S(.5,.5)},direction:{value:new S(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new z({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Q.BlurDirectionX=new S(1,0),Q.BlurDirectionY=new S(0,1);var $={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Oe=class extends X{constructor(){super(),this.isOutputPass=!0,this.uniforms=b.clone($.uniforms),this.material=new m({name:$.name,uniforms:this.uniforms,vertexShader:$.vertexShader,fragmentShader:$.fragmentShader}),this._fsQuad=new Z(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},P.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ke=n(),Ae=r(),je=[[new A(5221630),new A(62206),new A(4450683),new A(3733975),new A(4490446)],[new A(16275366),new A(16734296),new A(16711808),new A(16737096),new A(16748648)],[new A(6717162),new A(7752610),new A(15766523),new A(10309819),new A(7227562)],[new A(16697943),new A(16753922),new A(16744272),new A(16752451),new A(15618643)],[new A(2503490),new A(3422039),new A(1122898),new A(1056786),new A(2630208)]],Me={uTime:{value:0},uPulsePositions:{value:[new l(1e3,1e3,1e3),new l(1e3,1e3,1e3),new l(1e3,1e3,1e3)]},uPulseTimes:{value:[-1e3,-1e3,-1e3]},uPulseColors:{value:[new A(1,1,1),new A(1,1,1),new A(1,1,1)]},uPulseSpeed:{value:18},uBaseNodeSize:{value:.6}},Ne=`
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx; vec3 x2 = x0 - i2 + C.yyy; vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857; vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z); vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy; vec4 y = y_ * ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0; vec4 s1 = floor(b1) * 2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x); vec3 p1 = vec3(a0.zw, h.y); vec3 p2 = vec3(a1.xy, h.z); vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m; return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}`,Pe={vertexShader:`${Ne}
    attribute float nodeSize; attribute float nodeType; attribute vec3 nodeColor; attribute float distanceFromRoot;
    uniform float uTime; uniform vec3 uPulsePositions[3]; uniform float uPulseTimes[3]; uniform float uPulseSpeed; uniform float uBaseNodeSize;
    varying vec3 vColor; varying float vNodeType; varying vec3 vPosition; varying float vPulseIntensity; varying float vDistanceFromRoot; varying float vGlow;
    float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
        if (pulseTime < 0.0) return 0.0;
        float timeSinceClick = uTime - pulseTime;
        if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
        float pulseRadius = timeSinceClick * uPulseSpeed; float distToClick = distance(worldPos, pulsePos);
        float pulseThickness = 3.0; float waveProximity = abs(distToClick - pulseRadius);
        return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
    }
    void main() {
        vNodeType = nodeType; vColor = nodeColor; vDistanceFromRoot = distanceFromRoot;
        vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz; vPosition = worldPos;
        float totalPulseIntensity = 0.0;
        for (int i = 0; i < 3; i++) { totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]); }
        vPulseIntensity = min(totalPulseIntensity, 1.0);
        float breathe = sin(uTime * 0.7 + distanceFromRoot * 0.15) * 0.15 + 0.85;
        float baseSize = nodeSize * breathe; float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.5);
        vGlow = 0.5 + 0.5 * sin(uTime * 0.5 + distanceFromRoot * 0.2);
        vec3 modifiedPosition = position;
        if (nodeType > 0.5) { float noise = snoise(position * 0.08 + uTime * 0.08); modifiedPosition += normal * noise * 0.15; }
        vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
        gl_PointSize = pulseSize * uBaseNodeSize * (1000.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }`,fragmentShader:`
    uniform float uTime; uniform vec3 uPulseColors[3];
    varying vec3 vColor; varying float vNodeType; varying vec3 vPosition; varying float vPulseIntensity; varying float vDistanceFromRoot; varying float vGlow;
    void main() {
        vec2 center = 2.0 * gl_PointCoord - 1.0; float dist = length(center);
        if (dist > 1.0) discard;
        float glow1 = 1.0 - smoothstep(0.0, 0.5, dist); float glow2 = 1.0 - smoothstep(0.0, 1.0, dist);
        float glowStrength = pow(glow1, 1.2) + glow2 * 0.3;
        float breatheColor = 0.9 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25);
        vec3 baseColor = vColor * breatheColor; vec3 finalColor = baseColor;
        if (vPulseIntensity > 0.0) {
            vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.4);
            finalColor = mix(baseColor, pulseColor, vPulseIntensity * 0.8);
            finalColor *= (1.0 + vPulseIntensity * 1.2); glowStrength *= (1.0 + vPulseIntensity);
        }
        float coreBrightness = smoothstep(0.4, 0.0, dist); finalColor += vec3(1.0) * coreBrightness * 0.3;
        float alpha = glowStrength * (0.95 - 0.3 * dist);
        float camDistance = length(vPosition - cameraPosition); float distanceFade = smoothstep(100.0, 15.0, camDistance);
        if (vNodeType > 0.5) { finalColor *= 1.1; alpha *= 0.9; }
        finalColor *= (1.0 + vGlow * 0.1);
        gl_FragColor = vec4(finalColor, alpha * distanceFade);
    }`},Fe={vertexShader:`${Ne}
    attribute vec3 startPoint; attribute vec3 endPoint; attribute float connectionStrength; attribute float pathIndex; attribute vec3 connectionColor;
    uniform float uTime; uniform vec3 uPulsePositions[3]; uniform float uPulseTimes[3]; uniform float uPulseSpeed;
    varying vec3 vColor; varying float vConnectionStrength; varying float vPulseIntensity; varying float vPathPosition; varying float vDistanceFromCamera;
    float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
        if (pulseTime < 0.0) return 0.0;
        float timeSinceClick = uTime - pulseTime;
        if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
        float pulseRadius = timeSinceClick * uPulseSpeed; float distToClick = distance(worldPos, pulsePos);
        float pulseThickness = 3.0; float waveProximity = abs(distToClick - pulseRadius);
        return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
    }
    void main() {
        float t = position.x; vPathPosition = t;
        vec3 midPoint = mix(startPoint, endPoint, 0.5); float pathOffset = sin(t * 3.14159) * 0.15;
        vec3 perpendicular = normalize(cross(normalize(endPoint - startPoint), vec3(0.0, 1.0, 0.0)));
        if (length(perpendicular) < 0.1) perpendicular = vec3(1.0, 0.0, 0.0);
        midPoint += perpendicular * pathOffset;
        vec3 p0 = mix(startPoint, midPoint, t); vec3 p1 = mix(midPoint, endPoint, t); vec3 finalPos = mix(p0, p1, t);
        float noiseTime = uTime * 0.15; float noise = snoise(vec3(pathIndex * 0.08, t * 0.6, noiseTime));
        finalPos += perpendicular * noise * 0.12;
        vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;
        float totalPulseIntensity = 0.0;
        for (int i = 0; i < 3; i++) { totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]); }
        vPulseIntensity = min(totalPulseIntensity, 1.0);
        vColor = connectionColor; vConnectionStrength = connectionStrength; vDistanceFromCamera = length(worldPos - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    }`,fragmentShader:`
    uniform float uTime; uniform vec3 uPulseColors[3];
    varying vec3 vColor; varying float vConnectionStrength; varying float vPulseIntensity; varying float vPathPosition; varying float vDistanceFromCamera;
    void main() {
        float flowPattern1 = sin(vPathPosition * 25.0 - uTime * 4.0) * 0.5 + 0.5;
        float flowPattern2 = sin(vPathPosition * 15.0 - uTime * 2.5 + 1.57) * 0.5 + 0.5;
        float combinedFlow = (flowPattern1 + flowPattern2 * 0.5) / 1.5;
        vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.6 + vPathPosition * 12.0));
        float flowIntensity = 0.4 * combinedFlow * vConnectionStrength;
        vec3 finalColor = baseColor;
        if (vPulseIntensity > 0.0) {
            vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
            finalColor = mix(baseColor, pulseColor * 1.2, vPulseIntensity * 0.7);
            flowIntensity += vPulseIntensity * 0.8;
        }
        finalColor *= (0.7 + flowIntensity + vConnectionStrength * 0.5);
        float baseAlpha = 0.7 * vConnectionStrength; float flowAlpha = combinedFlow * 0.3;
        float alpha = baseAlpha + flowAlpha; alpha = mix(alpha, min(1.0, alpha * 2.5), vPulseIntensity);
        float distanceFade = smoothstep(100.0, 15.0, vDistanceFromCamera);
        gl_FragColor = vec4(finalColor, alpha * distanceFade);
    }`},Ie=class{position;connections;level;type;size;distanceFromRoot;constructor(e,t=0,n=0){this.position=e,this.connections=[],this.level=t,this.type=n,this.size=n===0?C.randFloat(.8,1.4):C.randFloat(.5,1),this.distanceFromRoot=0}addConnection(e,t=1){this.isConnectedTo(e)||(this.connections.push({node:e,strength:t}),e.connections.push({node:this,strength:t}))}isConnectedTo(e){return this.connections.some(t=>t.node===e)}},Le=({paletteIndex:e=0,bloomStrength:t=1.8,bloomRadius:n=.6,bloomThreshold:r=.7,densityFactor:i=1,interactive:a=!0,autoRotate:c=!0,rotationSpeed:f=.05,className:p=`absolute inset-0 w-full h-full -z-10 pointer-events-auto`})=>{let m=(0,B.useRef)(null),h=(0,B.useRef)(null),v=(0,B.useRef)({interactive:a,autoRotate:c,rotationSpeed:f,activePaletteIndex:e,densityFactor:i});return(0,B.useEffect)(()=>{v.current={interactive:a,autoRotate:c,rotationSpeed:f,activePaletteIndex:e,densityFactor:i}},[a,c,f,e,i]),(0,B.useEffect)(()=>{if(!m.current)return;let e=new _;e.fog=new ne(0,.002);let i=new s(65,window.innerWidth/window.innerHeight,.1,1e3);i.position.set(0,8,28);let a=new ie({canvas:m.current,antialias:!0,powerPreference:`high-performance`});a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setClearColor(0),a.outputColorSpace=d;let c=[],f=[],p=[];for(let e=0;e<2e3;e++){let e=C.randFloat(50,150),t=Math.acos(C.randFloatSpread(2)),n=C.randFloat(0,Math.PI*2);c.push(e*Math.sin(t)*Math.cos(n),e*Math.sin(t)*Math.sin(n),e*Math.cos(t));let r=Math.random();r<.7?f.push(1,1,1):r<.85?f.push(.7,.8,1):f.push(1,.9,.8),p.push(C.randFloat(.1,.3))}let y=new N;y.setAttribute(`position`,new j(c,1)),y.setAttribute(`color`,new j(f,3)),y.setAttribute(`size`,new j(p,1));let x=new z({uniforms:{uTime:{value:0}},vertexShader:`
            attribute float size; attribute vec3 color; varying vec3 vColor; uniform float uTime;
            void main() {
                vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                float twinkle = sin(uTime * 2.0 + position.x * 100.0) * 0.3 + 0.7;
                gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }`,fragmentShader:`
            varying vec3 vColor;
            void main() {
                vec2 center = gl_PointCoord - 0.5; float dist = length(center);
                if (dist > 0.5) discard;
                float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                gl_FragColor = vec4(vColor, alpha * 0.8);
            }`,transparent:!0,depthWrite:!1,blending:2}),w=new ee(y,x);e.add(w);let T=new se(i,a.domElement);T.enableDamping=!0,T.dampingFactor=.05,T.rotateSpeed=.6,T.minDistance=8,T.maxDistance=80,T.enablePan=!1;let E=new Te(a);E.addPass(new Ee(e,i));let D=new Q(new S(window.innerWidth,window.innerHeight),t,n,r);E.addPass(D),E.addPass(new Oe);let O=null,k=null,A=null;h.current={updateBloom:(e,t,n)=>{D.strength=e,D.radius=t,D.threshold=n},createNetworkVisualization:t=>{k&&(e.remove(k),k.geometry.dispose(),k.material.dispose()),A&&(e.remove(A),A.geometry.dispose(),A.material.dispose());let n=[],r=new Ie(new l(0,0,0),0,0);r.size=2,n.push(r);let i=(1+Math.sqrt(5))/2;for(let e=1;e<=5;e++){let a=e*4,o=Math.floor(e*12*t);for(let t=0;t<o;t++){let s=Math.acos(1-2*(t+.5)/o),c=2*Math.PI*t/i,u=new l(a*Math.sin(s)*Math.cos(c),a*Math.sin(s)*Math.sin(c),a*Math.cos(s)),d=new Ie(u,e,e===5||Math.random()<.3?1:0);if(d.distanceFromRoot=a,n.push(d),e>1){let t=n.filter(t=>t.level===e-1&&t!==r);t.sort((e,t)=>u.distanceTo(e.position)-u.distanceTo(t.position));for(let e=0;e<Math.min(3,t.length);e++){let n=1-u.distanceTo(t[e].position)/(a*2);d.addConnection(t[e],Math.max(.3,n))}}else r.addConnection(d,.9)}let s=n.filter(t=>t.level===e&&t!==r);for(let e=0;e<s.length;e++){let t=s[e],n=s.filter(e=>e!==t).sort((e,n)=>t.position.distanceTo(e.position)-t.position.distanceTo(n.position)).slice(0,5);for(let e of n)t.position.distanceTo(e.position)<a*.8&&!t.isConnectedTo(e)&&t.addConnection(e,.6)}}O={nodes:n,rootNode:r};let a=new N,o=[],s=[],c=[],u=[],d=[],f=je[v.current.activePaletteIndex];O.nodes.forEach(e=>{o.push(e.position.x,e.position.y,e.position.z),s.push(e.type),c.push(e.size),d.push(e.distanceFromRoot);let t=f[Math.min(e.level,f.length-1)%f.length].clone();t.offsetHSL(C.randFloatSpread(.03),C.randFloatSpread(.08),C.randFloatSpread(.08)),u.push(t.r,t.g,t.b)}),a.setAttribute(`position`,new j(o,3)),a.setAttribute(`nodeType`,new j(s,1)),a.setAttribute(`nodeSize`,new j(c,1)),a.setAttribute(`nodeColor`,new j(u,3)),a.setAttribute(`distanceFromRoot`,new j(d,1)),k=new ee(a,new z({uniforms:b.clone(Me),vertexShader:Pe.vertexShader,fragmentShader:Pe.fragmentShader,transparent:!0,depthWrite:!1,blending:2})),e.add(k);let p=new N,m=[],g=[],_=[],y=[],x=[],S=[],w=new Set,T=0;O.nodes.forEach((e,t)=>{e.connections.forEach(n=>{let r=n.node,i=O.nodes.indexOf(r);if(i===-1)return;let a=[Math.min(t,i),Math.max(t,i)].join(`-`);if(!w.has(a)){w.add(a);let t=e.position,i=r.position;for(let a=0;a<20;a++){let o=a/19;_.push(o,0,0),y.push(t.x,t.y,t.z),x.push(i.x,i.y,i.z),S.push(T),g.push(n.strength);let s=f[Math.min(Math.floor((e.level+r.level)/2),f.length-1)%f.length].clone();s.offsetHSL(C.randFloatSpread(.03),C.randFloatSpread(.08),C.randFloatSpread(.08)),m.push(s.r,s.g,s.b)}T++}})}),p.setAttribute(`position`,new j(_,3)),p.setAttribute(`startPoint`,new j(y,3)),p.setAttribute(`endPoint`,new j(x,3)),p.setAttribute(`connectionStrength`,new j(g,1)),p.setAttribute(`connectionColor`,new j(m,3)),p.setAttribute(`pathIndex`,new j(S,1)),A=new te(p,new z({uniforms:b.clone(Me),vertexShader:Fe.vertexShader,fragmentShader:Fe.fragmentShader,transparent:!0,depthWrite:!1,blending:2})),e.add(A),h.current?.updateTheme(v.current.activePaletteIndex)},updateTheme:e=>{if(!k||!A||!O)return;let t=je[e],n=k.geometry.attributes.nodeColor;for(let e=0;e<n.count;e++){let r=O.nodes[e];if(!r)continue;let i=t[Math.min(r.level,t.length-1)%t.length].clone();i.offsetHSL(C.randFloatSpread(.03),C.randFloatSpread(.08),C.randFloatSpread(.08)),n.setXYZ(e,i.r,i.g,i.b)}n.needsUpdate=!0;let r=[],i=new Set;O.nodes.forEach((e,n)=>{e.connections.forEach(a=>{let o=a.node,s=O.nodes.indexOf(o);if(s===-1)return;let c=[Math.min(n,s),Math.max(n,s)].join(`-`);if(!i.has(c)){i.add(c);for(let n=0;n<20;n++){let n=t[Math.min(Math.floor((e.level+o.level)/2),t.length-1)%t.length].clone();n.offsetHSL(C.randFloatSpread(.03),C.randFloatSpread(.08),C.randFloatSpread(.08)),r.push(n.r,n.g,n.b)}}})}),A.geometry.setAttribute(`connectionColor`,new j(r,3)),A.geometry.attributes.connectionColor.needsUpdate=!0,t.forEach((e,t)=>{t<3&&(k.material.uniforms.uPulseColors.value[t].copy(e),A.material.uniforms.uPulseColors.value[t].copy(e))})}},h.current.createNetworkVisualization(v.current.densityFactor);let re=new g,M=new S,P=new o(new l(0,0,1),0),F=new l,I=0,L=(e,t)=>{if(v.current.interactive&&(M.x=e/window.innerWidth*2-1,M.y=-(t/window.innerHeight)*2+1,re.setFromCamera(M,i),P.normal.copy(i.position).normalize(),P.constant=-P.normal.dot(i.position)+i.position.length()*.5,re.ray.intersectPlane(P,F))){let e=H.getElapsed();if(k&&A&&h.current){I=(I+1)%3,k.material.uniforms.uPulsePositions.value[I]?.copy(F),k.material.uniforms.uPulseTimes.value[I]=e,A.material.uniforms.uPulsePositions.value[I]?.copy(F),A.material.uniforms.uPulseTimes.value[I]=e;let t=je[v.current.activePaletteIndex],n=t[Math.floor(Math.random()*t.length)];k.material.uniforms.uPulseColors.value[I]?.copy(n),A.material.uniforms.uPulseColors.value[I]?.copy(n)}}},R=e=>L(e.clientX,e.clientY),B=e=>{e.touches.length>0&&L(e.touches[0].clientX,e.touches[0].clientY)};a.domElement.addEventListener(`click`,R),a.domElement.addEventListener(`touchstart`,B,{passive:!0});let V=()=>{i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),E.setSize(window.innerWidth,window.innerHeight),D.resolution.set(window.innerWidth,window.innerHeight)};window.addEventListener(`resize`,V);let H=new u;H.connect(document);let U,W=()=>{U=requestAnimationFrame(W),H.update();let e=H.getElapsed();T.autoRotate=v.current.autoRotate,T.autoRotateSpeed=v.current.rotationSpeed*10,v.current.autoRotate&&(k&&(k.rotation.y=Math.sin(e*v.current.rotationSpeed)*.05),A&&(A.rotation.y=Math.sin(e*v.current.rotationSpeed)*.05),w.rotation.y+=v.current.rotationSpeed*.005),x.uniforms.uTime.value=e,T.update(),E.render()};return W(),()=>{cancelAnimationFrame(U),H.dispose(),window.removeEventListener(`resize`,V),a.domElement.removeEventListener(`click`,R),a.domElement.removeEventListener(`touchstart`,B),a.dispose(),E.dispose(),k&&(k.geometry.dispose(),k.material.dispose()),A&&(A.geometry.dispose(),A.material.dispose()),y.dispose(),x.dispose()}},[]),(0,B.useEffect)(()=>{h.current&&h.current.updateBloom(t,n,r)},[t,n,r]),(0,B.useEffect)(()=>{h.current&&h.current.updateTheme(e)},[e]),(0,B.useEffect)(()=>{h.current&&h.current.createNetworkVisualization(i)},[i]),(0,Ae.jsx)(`canvas`,{ref:m,className:p})};function Re(){return(0,ke.createPortal)((0,Ae.jsx)(Le,{paletteIndex:0,bloomStrength:.9,densityFactor:.9,interactive:!0,autoRotate:!0,rotationSpeed:.03,className:`fixed top-0 left-0 min-h-screen h-dvh max-h-screen w-full max-w-screen overflow-hidden -z-10 pointer-events-none`}),document.body)}export{Re as default};