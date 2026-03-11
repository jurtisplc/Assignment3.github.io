function getCurrentDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.getElementById("date").innerText = date + " " + time;
}
window.onload = function () {
  getCurrentDateTime();
};

function SubmitForm() {
  const nameMH = $("#TenMonHoc").val();
  const nameGV = $("#TenGiangVien").val();
  const nameSV = $("#HotenSinhVien").val();
  if (nameMH.trim() === "" || nameGV.trim() === "" || nameSV.trim() === "") {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }
  const ratings = {};
  let count = 0;
  let sum = 0;
  $(".table_rating tr").each(function (index) {
    if (index === 0) return;
    const selectedRating = $(this).find('input[type="radio"]:checked').val();
    if (selectedRating) {
      const score = parseInt(selectedRating);
      ratings["Tiêu chí " + (count + 1)] = selectedRating;
      sum += score;
      count++;
    }
  });
  if (count === 0) {
    alert("Vui lòng chọn ít nhất một đánh giá.");
    return;
  }
  const averageRating = (sum / count).toFixed(2);
  const FormInfo = {
    courseName: nameMH,
    teacherName: nameGV,
    studentName: nameSV,
    submitTime: new Date().toLocaleString("vi-VN"),
    criteria: ratings,
    averageScore: averageRating,
  };
  $("#result").text(JSON.stringify(FormInfo, null, 2));
}
