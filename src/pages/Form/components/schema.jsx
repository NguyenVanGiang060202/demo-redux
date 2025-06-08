import * as yup from 'yup';


export const menteeTarget = [
    "Sinh viên mới tốt nghiệp",
    "Junior",
    "Người mới chuyển ngành",
    "Thực tập sinh",
    "Sinh viên năm cuối",
    "Người đang tìm việc đầu tiên",
    "Fresher",
    "Người học trái ngành",
];

export const shareContent = [
    "Career coach",
    "Định hướng học tập",
    "Kỹ năng mềm",
    "Phát triển bản thân",
    "Lộ trình nghề nghiệp",
    "Phỏng vấn và CV",
    "Chia sẻ kinh nghiệm làm việc",
    "Kỹ năng tìm việc",
    "Học bổng và du học",
    "Tư duy phản biện",
];

export const expertise = [
    "Toán học",
    "Ngôn ngữ học",
    "Khoa học dữ liệu",
    "Quản trị kinh doanh",
    "Tâm lý học",
    "Kỹ năng mềm",
    "Kỹ thuật phần mềm"
]

export const fullSchema = yup.object({
    role: yup
        .string()
        .required('Vai trò là bắt buộc')
        .oneOf(['mentor', 'educator']),

    fullname: yup
        .string()
        .required('Họ và tên là bắt buộc')
        .min(2, 'Họ và tên phải có ít nhất 2 ký tự'),

    gender: yup
        .string()
        .oneOf(['Anh', 'Chị'], 'Giới tính không hợp lệ'),

    email: yup
        .string()
        .required('Email là bắt buộc')
        .email('Email không hợp lệ'),

    phonenumber: yup
        .string()
        .required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ'),

    linkedln: yup
        .string()
        .required('Link LinkedIn là bắt buộc')
        .url('Link LinkedIn không hợp lệ'),

    social: yup
        .string()
        .required('Link mạng xã hội là bắt buộc')
        .url('Link mạng xã hội không hợp lệ'),


    menteeTarget: yup.array().when('role', {
        is: 'mentor',
        then: (schema) =>
            schema
                .min(1, 'Vui lòng chọn ít nhất 1 đối tượng')
                .of(
                    yup.string().oneOf(menteeTarget, 'Giá trị không hợp lệ')
                )
                .required('Vui lòng chọn ít nhất 1 đối tượng'),
        otherwise: (schema) => schema.notRequired(),
    }),
    shareContent: yup.array().when('role', {
        is: 'mentor',
        then: (schema) =>
            schema
                .min(1, 'Vui lòng chọn ít nhất 1 nội dung')
                .of(
                    yup.string().oneOf(shareContent, 'Giá trị không hợp lệ')
                )
                .required('Vui lòng chọn ít nhất 1 nội dung'),
        otherwise: (schema) => schema.notRequired(),
    }),

    experience: yup.number().when('role', {
        is: 'educator',
        then: (schema) =>
            schema
                .min(0, 'Kinh nghiệm phải từ 0 trở lên')
                .required('Vui lòng nhập số năm kinh nghiệm'),
        otherwise: (schema) => schema.notRequired(),
    }),

    expertise: yup.array().when('role', {
        is: 'educator',
        then: (schema) =>
            schema
                .min(1, 'Vui lòng chọn ít nhất một chuyên môn')
                .of(
                    yup.string().oneOf(expertise, 'Giá trị không hợp lệ')
                )
                .required('Vui lòng chọn ít nhất một chuyên môn'),
        otherwise: (schema) => schema.notRequired(),
    }),

    resume: yup
        .mixed()
        .when('role', {
            is: 'educator',
            then: (schema) =>
                schema
                    .required('Vui lòng đăng tải chứng chỉ'),
            otherwise: (schema) => schema.notRequired(),
        }),
    // .test("fileSize", "File quá lớn", (value) => {
    //     return value && value.size <= 5 * 1024 * 1024; // tối đa 5MB
    // })
    // .test("fileType", "Chỉ chấp nhận PDF hoặc", (value) => {
    //     return value && (value.type === "application/pdf ");
    // }),

});

