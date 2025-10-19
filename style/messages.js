// Định nghĩa các bộ lời chúc cho từng người
const MESSAGES = {
	// ID: 1 - Lời tỏ tình
	"1": {
		recipient: "em",
		pages: [
			"❤️",
			"Anh viết những dòng này không phải vì nhất thời rung động,",
			"Mà vì anh đã nghĩ đến {name} rất nhiều.",
			"Mỗi lần nhìn thấy {name} cười,",
			"trái tim anh lại lặng đi một nhịp.",
			"Anh không biết từ khi nào...🥰",
			"nhưng {name} đã trở thành một phần đặc biệt trong anh.",
			"Không ồn ào, không rực rỡ ✨,",
			"chỉ là sự hiện diện của {name} làm mọi thứ trở nên dễ chịu hơn.",
			"Anh không hứa sẽ mang cả thế giới cho {name},",
			"nhưng anh có thể trao {name} cả trái tim này ❤️‍🔥.",
			"Chỉ cần {name} muốn,",
			"anh luôn sẵn sàng ở đây,",
			"lặng lẽ quan tâm và chờ {name} quay lại nhìn anh.",
			"{name} có thể không hoàn hảo,",
			"nhưng trong mắt anh, {name} là duy nhất 💯.",
			"Không cần quá nhiều lý do,",
			"chỉ đơn giản là... anh thích {name} ☺️.",
			"Thích ánh mắt ấy, nụ cười ấy, cách {name} bước qua đời anh nhẹ nhàng.",
			"Nếu {name} cũng có chút gì đó giống anh...",
			"Thì cho anh một cơ hội, được ở bên cạnh {name}.",
			"Thật lòng.",
			"Chỉ mình {name}. Anh yêu {name} ❤️"
		]
	},
    
	// ID: 2 - Lời chúc sinh nhật
	"2": {
		recipient: "bạn",
		pages: [
			"Chúc mừng sinh nhật {name}! 🎂",
			"Hôm nay là một ngày đặc biệt,",
			"Vì đó là ngày {name} đến với thế giới này.",
			"Mong rằng tuổi mới của {name},",
			"Sẽ tràn đầy niềm vui và hạnh phúc.",
			"Những ước mơ của {name},",
			"Sẽ trở thành hiện thực.",
			"Mọi điều tốt đẹp nhất,",
			"Sẽ đến với {name}.",
			"Chúc {name} sinh nhật vui vẻ! 🎉"
		]
	},
    
	// ID: 3 - Lời chúc Tết
	"3": {
		recipient: "gia đình",
		pages: [
			"Chúc mừng năm mới {name}! 🎊",
			"Xuân về rộn ràng,",
			"Mang theo niềm vui mới.",
			"Chúc {name} luôn mạnh khỏe,",
			"An khang thịnh vượng.",
			"Vạn sự như ý,",
			"Phát tài phát lộc.",
			"Chúc {name} năm mới hạnh phúc! 🌸"
		]
	},
    
	// ID: 4 - Lời cảm ơn
	"4": {
		recipient: "bạn",
		pages: [
			"Cảm ơn {name}! 💝",
			"Vì đã luôn ở bên cạnh,",
			"Khi mình cần nhất.",
			"Những khoảnh khắc bên {name},",
			"Là những kỷ niệm đẹp nhất.",
			"Mình thật may mắn,",
			"Khi có {name} bên cạnh.",
			"Cảm ơn {name} vì tất cả! 🙏"
		]
	}
};

// Ánh xạ ID nội bộ -> tên người nhận và ID bộ lời chúc
// Thêm/sửa trong file này để cấu hình nhanh: index.html?id=<key>
const RECIPIENT_MAP = {
	// Tỏ tình
	"linh": { name: "Linh", messageId: "1" },
	"em-yeu": { name: "Em yêu", messageId: "1" },

	// Ví dụ thêm mới
	"0": { name: "Nguyễn Văn A", messageId: "1" },
	"198": { name: "Thu", messageId: "1" },

	// Sinh nhật
	"nam-bday": { name: "Nam", messageId: "2" },
	"me-birthday": { name: "Mẹ", messageId: "2" },

	// Tết
	"gia-dinh-tet": { name: "Gia đình", messageId: "3" },
	"ong-ba": { name: "Ông bà", messageId: "3" },

	// Cảm ơn
	"minh-thanks": { name: "Minh", messageId: "4" },
	"co-giao": { name: "Cô giáo", messageId: "4" }
};

// Hàm lấy thông tin lời chúc từ URL parameters
function getMessageData() {
	const urlParams = new URLSearchParams(window.location.search);
	const idParam = urlParams.get('id') || '1'; // Có thể là mã người nhận (RECIPIENT_MAP) hoặc ID lời chúc

	let resolvedMessageId;
	let resolvedRecipientName;

	if (RECIPIENT_MAP[idParam]) {
		resolvedMessageId = RECIPIENT_MAP[idParam].messageId;
		resolvedRecipientName = RECIPIENT_MAP[idParam].name;
	} else {
		// Fallback: idParam chính là messageId; lấy name từ query hoặc default trong bộ lời chúc
		resolvedMessageId = idParam;
		resolvedRecipientName = urlParams.get('name') || MESSAGES[resolvedMessageId]?.recipient || 'bạn';
	}

	const messageData = MESSAGES[resolvedMessageId];

	if (!messageData) {
		// Nếu không tìm thấy ID, dùng lời chúc mặc định
		return {
			recipient: resolvedRecipientName,
			pages: MESSAGES['1'].pages,
			imageUrl: `./assets/${resolvedRecipientName}.jpg`
		};
	}

	return {
		recipient: resolvedRecipientName,
		pages: messageData.pages,
		imageUrl: `./assets/${resolvedRecipientName}.jpg`
	};
}
