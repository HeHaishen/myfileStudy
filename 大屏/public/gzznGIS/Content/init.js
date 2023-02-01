var pGzznCore = new gzznCore('crystalContainer');
pGzznCore.FlyTo();
//pGzznCore.attacheventMouseMove(pGzznCore,null);
//pGzznCore.attacheventMouseClick(pGzznCore,null);
document.getElementById('envCenterInfo').addEventListener('click', function () {
	var pTest = pGzznCore.indicatorShow();
}, false);
function showdetailsInfo(vValue){
	//pGzznCore.showdetailsInfo(vValue);
}