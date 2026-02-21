const subjectData = {
  Toán:{
    "theory": {
  "definition": {
    "title": "Khái niệm",
    "content": [
      "Phương trình bậc nhất một ẩn là phương trình có một chữ chưa biết (thường là x).",
      "Ẩn có số mũ bằng 1.",
      "Mọi phương trình dạng này đều đưa được về dạng Ax + B = 0."
    ]
  },

  "form": {
    "title": "Dạng tổng quát",
    "math": "Ax + B = 0",
    "conditions": [
      "A và B là các số đã biết",
      "A ≠ 0",
      "x là ẩn"
    ]
  },

  "structure": {
    "title": "Thành phần phương trình",
    "points": [
      "Phương trình có hai vế.",
      "Bên trái dấu = là vế trái.",
      "Bên phải dấu = là vế phải."
    ]
  },

  "solution_concept": {
    "title": "Nghiệm của phương trình",
    "points": [
      "Nghiệm là giá trị của x làm cho hai vế bằng nhau.",
      "Khi hai vế bằng nhau thì phương trình đúng.",
      "Giá trị đó được gọi là nghiệm."
    ]
  },

  "method": {
    "title": "Phương pháp giải",
    "steps": [
      {
        "step": 1,
        "name": "Chuyển vế",
        "desc": "Đưa ẩn về một phía, số tự do sang phía còn lại."
      },
      {
        "step": 2,
        "name": "Chia hệ số",
        "desc": "Chia cả hai vế cho hệ số của ẩn (khác 0)."
      },
      {
        "step": 3,
        "name": "Kết luận",
        "desc": "Ghi nghiệm của phương trình."
      }
    ]
  },

  "memory_tip": {
    "title": "Mẹo nhớ nhanh",
    "content": [
      "Cô lập x: đưa x đứng một mình ở một vế.",
      "Không để x còn cộng, trừ, nhân, chia với số khác."
    ]
  },

  "types": {
    "title": "Các dạng thường gặp",
    "list": [
      "Ax + B = 0",
      "Phương trình có ẩn ở hai vế (ví dụ: 12x + 8 = 16x)"
    ]
  },

  "important_note": {
    "title": "Ghi nhớ",
    "content": [
      "Mọi phương trình bậc nhất một ẩn đều đưa được về dạng Ax + B = 0 với A ≠ 0."
    ]
  }
},

    practice:[
      {q:"2 + 2 = ?", a:"4"},
      {q:"5 x 3 = ?", a:"15"}
    ],

    test:[
      {
        q:"5 x 2 = ?",
        choices:["8","10","12"],
        correct:1
      }
    ]
  },

  "Ngữ Văn":{   // ✔ đúng
    theory:["Thơ lục bát"],
    practice:[{q:"Lục bát gồm mấy chữ?",a:"6 và 8"}],
    test:[]
  }
};
