import{a as e}from"./rolldown-runtime-Cn8xt2Gj.js";import{i as t,r as n,t as r}from"./vendor-CPadXvLK.js";import{B as i,C as a,D as o,E as s,F as c,G as l,H as u,I as d,K as f,L as p,M as m,N as h,O as g,P as _,R as v,S as y,T as b,U as x,V as S,W as C,_ as w,b as T,c as E,d as D,f as O,g as ee,h as k,i as te,k as ne,l as re,n as A,p as j,q as M,r as N,s as P,t as ie,u as F,v as ae,w as oe,x as I,y as L,z as se}from"./three.module-DrXGb7ZR.js";var R=e(t(),1),z={type:`change`},B={type:`start`},V={type:`end`},H=new _,U=new g,ce=Math.cos(70*I.DEG2RAD),W=new f,G=2*Math.PI,K={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},q=1e-6,le=class extends O{constructor(e,t=null){super(e,t),this.state=K.NONE,this.target=new f,this.cursor=new f,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:T.ROTATE,MIDDLE:T.DOLLY,RIGHT:T.PAN},this.touches={ONE:u.ROTATE,TWO:u.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new f,this._lastQuaternion=new m,this._lastTargetPosition=new f,this._quat=new m().setFromUnitVectors(e.up,new f(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new S,this._sphericalDelta=new S,this._scale=1,this._panOffset=new f,this._rotateStart=new l,this._rotateEnd=new l,this._rotateDelta=new l,this._panStart=new l,this._panEnd=new l,this._panDelta=new l,this._dollyStart=new l,this._dollyEnd=new l,this._dollyDelta=new l,this._dollyDirection=new f,this._mouse=new l,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=de.bind(this),this._onPointerDown=ue.bind(this),this._onPointerUp=fe.bind(this),this._onContextMenu=ye.bind(this),this._onMouseWheel=he.bind(this),this._onKeyDown=ge.bind(this),this._onTouchStart=_e.bind(this),this._onTouchMove=ve.bind(this),this._onMouseDown=pe.bind(this),this._onMouseMove=me.bind(this),this._interceptControlDown=be.bind(this),this._interceptControlUp=xe.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(z),this.update(),this.state=K.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;W.copy(t).sub(this.target),W.applyQuaternion(this._quat),this._spherical.setFromVector3(W),this.autoRotate&&this.state===K.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=G:n>Math.PI&&(n-=G),r<-Math.PI?r+=G:r>Math.PI&&(r-=G),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(W.setFromSpherical(this._spherical),W.applyQuaternion(this._quatInverse),t.copy(this.target).add(W),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=W.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new f(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new f(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=W.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(H.origin.copy(this.object.position),H.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(H.direction))<ce?this.object.lookAt(this.target):(U.setFromNormalAndCoplanarPoint(this.object.up,this.target),H.intersectPlane(U,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>q||8*(1-this._lastQuaternion.dot(this.object.quaternion))>q||this._lastTargetPosition.distanceToSquared(this.target)>q?(this.dispatchEvent(z),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?G/60/60*this.autoRotateSpeed:G/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){W.setFromMatrixColumn(t,0),W.multiplyScalar(-e),this._panOffset.add(W)}_panUp(e,t){this.screenSpacePanning===!0?W.setFromMatrixColumn(t,1):(W.setFromMatrixColumn(t,0),W.crossVectors(this.object.up,W)),W.multiplyScalar(e),this._panOffset.add(W)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;W.copy(r).sub(this.target);let i=W.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(G*this._rotateDelta.x/t.clientHeight),this._rotateUp(G*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(G*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-G*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(G*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-G*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(G*this._rotateDelta.x/t.clientHeight),this._rotateUp(G*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new l,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ue(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function de(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function fe(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(V),this.state=K.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y});break}}function pe(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case T.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=K.DOLLY;break;case T.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=K.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=K.ROTATE}break;case T.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=K.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=K.PAN}break;default:this.state=K.NONE}this.state!==K.NONE&&this.dispatchEvent(B)}function me(e){switch(this.state){case K.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case K.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case K.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function he(e){this.enabled===!1||this.enableZoom===!1||this.state!==K.NONE||(e.preventDefault(),this.dispatchEvent(B),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(V))}function ge(e){this.enabled!==!1&&this._handleKeyDown(e)}function _e(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case u.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=K.TOUCH_ROTATE;break;case u.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=K.TOUCH_PAN;break;default:this.state=K.NONE}break;case 2:switch(this.touches.TWO){case u.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=K.TOUCH_DOLLY_PAN;break;case u.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=K.TOUCH_DOLLY_ROTATE;break;default:this.state=K.NONE}break;default:this.state=K.NONE}this.state!==K.NONE&&this.dispatchEvent(B)}function ve(e){switch(this._trackPointer(e),this.state){case K.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case K.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case K.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case K.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=K.NONE}}function ye(e){this.enabled!==!1&&e.preventDefault()}function be(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function xe(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var J={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},Y=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Se=new s(-1,1,1,-1,0,1),Ce=new class extends P{constructor(){super(),this.setAttribute(`position`,new k([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new k([0,2,0,0,2,0],2))}},X=class{constructor(e){this._mesh=new y(Ce,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Se)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},we=class extends Y{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof i?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=C.clone(e.uniforms),this.material=new i({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new X(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Te=class extends Y{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ee=class extends Y{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},De=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new l);this._width=n.width,this._height=n.height,t=new M(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:w}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new we(J),this.copyPass.material.blending=0,this.timer=new x}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Te!==void 0&&(r instanceof Te?n=!0:r instanceof Ee&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new l);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Oe=class extends Y{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new F}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},ke={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new F(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},Z=class e extends Y{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new l(256,256):new l(e.x,e.y),this.clearColor=new F(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new M(o,s,{type:w}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new M(o,s,{type:w});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new M(o,s,{type:w});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),o=Math.round(o/2),s=Math.round(s/2)}let c=ke;this.highPassUniforms=C.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new i({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let u=[6,10,14,18,22];o=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(u[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new l(1/o,1/s),o=Math.round(o/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new f(1,1,1),new f(1,1,1),new f(1,1,1),new f(1,1,1),new f(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=C.clone(J.uniforms),this.blendMaterial=new i({uniforms:this.copyUniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new F,this._oldClearAlpha=1,this._basic=new a,this._fsQuad=new X(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new l(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new i({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new l(.5,.5)},direction:{value:new l(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new i({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Z.BlurDirectionX=new l(1,0),Z.BlurDirectionY=new l(0,1);var Q={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},Ae=class extends Y{constructor(){super(),this.isOutputPass=!0,this.uniforms=C.clone(Q.uniforms),this.material=new h({name:Q.name,uniforms:this.uniforms,vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader}),this._fsQuad=new X(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},D.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},je=n(),Me=r(),$=[[new F(5221630),new F(62206),new F(4450683),new F(3733975),new F(4490446)],[new F(16275366),new F(16734296),new F(16711808),new F(16737096),new F(16748648)],[new F(6717162),new F(7752610),new F(15766523),new F(10309819),new F(7227562)],[new F(16697943),new F(16753922),new F(16744272),new F(16752451),new F(15618643)],[new F(2503490),new F(3422039),new F(1122898),new F(1056786),new F(2630208)]],Ne={uTime:{value:0},uPulsePositions:{value:[new f(1e3,1e3,1e3),new f(1e3,1e3,1e3),new f(1e3,1e3,1e3)]},uPulseTimes:{value:[-1e3,-1e3,-1e3]},uPulseColors:{value:[new F(1,1,1),new F(1,1,1),new F(1,1,1)]},uPulseSpeed:{value:18},uBaseNodeSize:{value:.6}},Pe=`
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
}`,Fe={vertexShader:`${Pe}
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
    }`},Ie={vertexShader:`${Pe}
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
    }`},Le=class{position;connections;level;type;size;distanceFromRoot;constructor(e,t=0,n=0){this.position=e,this.connections=[],this.level=t,this.type=n,this.size=n===0?I.randFloat(.8,1.4):I.randFloat(.5,1),this.distanceFromRoot=0}addConnection(e,t=1){this.isConnectedTo(e)||(this.connections.push({node:e,strength:t}),e.connections.push({node:this,strength:t}))}isConnectedTo(e){return this.connections.some(t=>t.node===e)}},Re=({paletteIndex:e=0,bloomStrength:t=1.8,bloomRadius:n=.6,bloomThreshold:r=.7,densityFactor:a=1,interactive:s=!0,autoRotate:u=!0,rotationSpeed:d=.05,className:m=`absolute inset-0 w-full h-full -z-10 pointer-events-auto`})=>{let h=(0,R.useRef)(null),_=(0,R.useRef)(null),v=(0,R.useRef)({interactive:s,autoRotate:u,rotationSpeed:d,activePaletteIndex:e,densityFactor:a});return(0,R.useEffect)(()=>{v.current={interactive:s,autoRotate:u,rotationSpeed:d,activePaletteIndex:e,densityFactor:a}},[s,u,d,e,a]),(0,R.useEffect)(()=>{if(!h.current)return;let e=new se;e.fog=new ee(0,.002);let a=new o(65,window.innerWidth/window.innerHeight,.1,1e3);a.position.set(0,8,28);let s=new ie({canvas:h.current,antialias:!0,powerPreference:`high-performance`});s.setSize(window.innerWidth,window.innerHeight),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setClearColor(0),s.outputColorSpace=p;let u=[],d=[],m=[];for(let e=0;e<2e3;e++){let e=I.randFloat(50,150),t=Math.acos(I.randFloatSpread(2)),n=I.randFloat(0,Math.PI*2);u.push(e*Math.sin(t)*Math.cos(n),e*Math.sin(t)*Math.sin(n),e*Math.cos(t));let r=Math.random();r<.7?d.push(1,1,1):r<.85?d.push(.7,.8,1):d.push(1,.9,.8),m.push(I.randFloat(.1,.3))}let y=new P;y.setAttribute(`position`,new k(u,1)),y.setAttribute(`color`,new k(d,3)),y.setAttribute(`size`,new k(m,1));let b=new i({uniforms:{uTime:{value:0}},vertexShader:`
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
            }`,transparent:!0,depthWrite:!1,blending:2}),x=new ne(y,b);e.add(x);let S=new le(a,s.domElement);S.enableDamping=!0,S.dampingFactor=.05,S.rotateSpeed=.6,S.minDistance=8,S.maxDistance=80,S.enablePan=!1;let w=new De(s);w.addPass(new Oe(e,a));let T=new Z(new l(window.innerWidth,window.innerHeight),t,n,r);w.addPass(T),w.addPass(new Ae);let E=null,D=null,O=null;_.current={updateBloom:(e,t,n)=>{T.strength=e,T.radius=t,T.threshold=n},createNetworkVisualization:t=>{D&&(e.remove(D),D.geometry.dispose(),D.material.dispose()),O&&(e.remove(O),O.geometry.dispose(),O.material.dispose());let n=[],r=new Le(new f(0,0,0),0,0);r.size=2,n.push(r);let a=(1+Math.sqrt(5))/2;for(let e=1;e<=5;e++){let i=e*4,o=Math.floor(e*12*t);for(let t=0;t<o;t++){let s=Math.acos(1-2*(t+.5)/o),c=2*Math.PI*t/a,l=new f(i*Math.sin(s)*Math.cos(c),i*Math.sin(s)*Math.sin(c),i*Math.cos(s)),u=new Le(l,e,e===5||Math.random()<.3?1:0);if(u.distanceFromRoot=i,n.push(u),e>1){let t=n.filter(t=>t.level===e-1&&t!==r);t.sort((e,t)=>l.distanceTo(e.position)-l.distanceTo(t.position));for(let e=0;e<Math.min(3,t.length);e++){let n=1-l.distanceTo(t[e].position)/(i*2);u.addConnection(t[e],Math.max(.3,n))}}else r.addConnection(u,.9)}let s=n.filter(t=>t.level===e&&t!==r);for(let e=0;e<s.length;e++){let t=s[e],n=s.filter(e=>e!==t).sort((e,n)=>t.position.distanceTo(e.position)-t.position.distanceTo(n.position)).slice(0,5);for(let e of n)t.position.distanceTo(e.position)<i*.8&&!t.isConnectedTo(e)&&t.addConnection(e,.6)}}E={nodes:n,rootNode:r};let o=new P,s=[],c=[],l=[],u=[],d=[],p=$[v.current.activePaletteIndex];E.nodes.forEach(e=>{s.push(e.position.x,e.position.y,e.position.z),c.push(e.type),l.push(e.size),d.push(e.distanceFromRoot);let t=p[Math.min(e.level,p.length-1)%p.length].clone();t.offsetHSL(I.randFloatSpread(.03),I.randFloatSpread(.08),I.randFloatSpread(.08)),u.push(t.r,t.g,t.b)}),o.setAttribute(`position`,new k(s,3)),o.setAttribute(`nodeType`,new k(c,1)),o.setAttribute(`nodeSize`,new k(l,1)),o.setAttribute(`nodeColor`,new k(u,3)),o.setAttribute(`distanceFromRoot`,new k(d,1)),D=new ne(o,new i({uniforms:C.clone(Ne),vertexShader:Fe.vertexShader,fragmentShader:Fe.fragmentShader,transparent:!0,depthWrite:!1,blending:2})),e.add(D);let m=new P,h=[],g=[],y=[],b=[],x=[],S=[],w=new Set,T=0;E.nodes.forEach((e,t)=>{e.connections.forEach(n=>{let r=n.node,i=E.nodes.indexOf(r);if(i===-1)return;let a=[Math.min(t,i),Math.max(t,i)].join(`-`);if(!w.has(a)){w.add(a);let t=e.position,i=r.position;for(let a=0;a<20;a++){let o=a/19;y.push(o,0,0),b.push(t.x,t.y,t.z),x.push(i.x,i.y,i.z),S.push(T),g.push(n.strength);let s=p[Math.min(Math.floor((e.level+r.level)/2),p.length-1)%p.length].clone();s.offsetHSL(I.randFloatSpread(.03),I.randFloatSpread(.08),I.randFloatSpread(.08)),h.push(s.r,s.g,s.b)}T++}})}),m.setAttribute(`position`,new k(y,3)),m.setAttribute(`startPoint`,new k(b,3)),m.setAttribute(`endPoint`,new k(x,3)),m.setAttribute(`connectionStrength`,new k(g,1)),m.setAttribute(`connectionColor`,new k(h,3)),m.setAttribute(`pathIndex`,new k(S,1)),O=new ae(m,new i({uniforms:C.clone(Ne),vertexShader:Ie.vertexShader,fragmentShader:Ie.fragmentShader,transparent:!0,depthWrite:!1,blending:2})),e.add(O),_.current?.updateTheme(v.current.activePaletteIndex)},updateTheme:e=>{if(!D||!O||!E)return;let t=$[e],n=D.geometry.attributes.nodeColor;for(let e=0;e<n.count;e++){let r=E.nodes[e];if(!r)continue;let i=t[Math.min(r.level,t.length-1)%t.length].clone();i.offsetHSL(I.randFloatSpread(.03),I.randFloatSpread(.08),I.randFloatSpread(.08)),n.setXYZ(e,i.r,i.g,i.b)}n.needsUpdate=!0;let r=[],i=new Set;E.nodes.forEach((e,n)=>{e.connections.forEach(a=>{let o=a.node,s=E.nodes.indexOf(o);if(s===-1)return;let c=[Math.min(n,s),Math.max(n,s)].join(`-`);if(!i.has(c)){i.add(c);for(let n=0;n<20;n++){let n=t[Math.min(Math.floor((e.level+o.level)/2),t.length-1)%t.length].clone();n.offsetHSL(I.randFloatSpread(.03),I.randFloatSpread(.08),I.randFloatSpread(.08)),r.push(n.r,n.g,n.b)}}})}),O.geometry.setAttribute(`connectionColor`,new k(r,3)),O.geometry.attributes.connectionColor.needsUpdate=!0,t.forEach((e,t)=>{t<3&&(D.material.uniforms.uPulseColors.value[t].copy(e),O.material.uniforms.uPulseColors.value[t].copy(e))})}},_.current.createNetworkVisualization(v.current.densityFactor);let te=new c,A=new l,j=new g(new f(0,0,1),0),M=new f,N=0,F=(e,t)=>{if(v.current.interactive&&(A.x=e/window.innerWidth*2-1,A.y=-(t/window.innerHeight)*2+1,te.setFromCamera(A,a),j.normal.copy(a.position).normalize(),j.constant=-j.normal.dot(a.position)+a.position.length()*.5,te.ray.intersectPlane(j,M))){let e=z.getElapsedTime();if(D&&O&&_.current){N=(N+1)%3,D.material.uniforms.uPulsePositions.value[N]?.copy(M),D.material.uniforms.uPulseTimes.value[N]=e,O.material.uniforms.uPulsePositions.value[N]?.copy(M),O.material.uniforms.uPulseTimes.value[N]=e;let t=$[v.current.activePaletteIndex],n=t[Math.floor(Math.random()*t.length)];D.material.uniforms.uPulseColors.value[N]?.copy(n),O.material.uniforms.uPulseColors.value[N]?.copy(n)}}},oe=e=>F(e.clientX,e.clientY),L=e=>{e.touches.length>0&&F(e.touches[0].clientX,e.touches[0].clientY)};s.domElement.addEventListener(`click`,oe),s.domElement.addEventListener(`touchstart`,L,{passive:!0});let R=()=>{a.aspect=window.innerWidth/window.innerHeight,a.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight),w.setSize(window.innerWidth,window.innerHeight),T.resolution.set(window.innerWidth,window.innerHeight)};window.addEventListener(`resize`,R);let z=new re,B,V=()=>{B=requestAnimationFrame(V);let e=z.getElapsedTime();S.autoRotate=v.current.autoRotate,S.autoRotateSpeed=v.current.rotationSpeed*10,v.current.autoRotate&&(D&&(D.rotation.y=Math.sin(e*v.current.rotationSpeed)*.05),O&&(O.rotation.y=Math.sin(e*v.current.rotationSpeed)*.05),x.rotation.y+=v.current.rotationSpeed*.005),b.uniforms.uTime.value=e,S.update(),w.render()};return V(),()=>{cancelAnimationFrame(B),window.removeEventListener(`resize`,R),s.domElement.removeEventListener(`click`,oe),s.domElement.removeEventListener(`touchstart`,L),s.dispose(),w.dispose(),D&&(D.geometry.dispose(),D.material.dispose()),O&&(O.geometry.dispose(),O.material.dispose()),y.dispose(),b.dispose()}},[]),(0,R.useEffect)(()=>{_.current&&_.current.updateBloom(t,n,r)},[t,n,r]),(0,R.useEffect)(()=>{_.current&&_.current.updateTheme(e)},[e]),(0,R.useEffect)(()=>{_.current&&_.current.createNetworkVisualization(a)},[a]),(0,Me.jsx)(`canvas`,{ref:h,className:m})};function ze(){return(0,je.createPortal)((0,Me.jsx)(Re,{paletteIndex:0,bloomStrength:.9,densityFactor:.9,interactive:!0,autoRotate:!0,rotationSpeed:.03,className:`fixed top-0 left-0 min-h-screen h-dvh max-h-screen w-full max-w-screen overflow-hidden -z-10 pointer-events-none`}),document.body)}export{ze as default};