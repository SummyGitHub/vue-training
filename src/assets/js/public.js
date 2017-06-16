var publicFun = {
	submitUploadExcel: (targetDom) => {
		var form  = document.getElementById('targetDom');
		var formData = new FormData(form);
		return formData;
	}
};

export default publicFun