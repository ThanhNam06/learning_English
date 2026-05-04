import React from "react";
import { useParams, Navigate, Link } from "react-router";
import { ShieldCheck, FileText, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

export const Legal = () => {
  const { type } = useParams();

  if (type !== 'privacy' && type !== 'terms') {
    return <Navigate to="/" replace />;
  }

  const isPrivacy = type === 'privacy';
  const Icon = isPrivacy ? ShieldCheck : FileText;
  const title = isPrivacy ? "Chính sách Bảo mật" : "Điều khoản Sử dụng";
  const lastUpdated = "10 Tháng 5, 2026";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors w-fit">
        <Link to="/" className="flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Trở về trang chủ
        </Link>
      </div>

      <div className="bg-[#0f1123] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-2xl ${isPrivacy ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
              <p className="text-slate-400 mt-2">Cập nhật lần cuối: {lastUpdated}</p>
            </div>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none mt-10">
            {isPrivacy ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">1. Thu thập Thông tin</h2>
                  <p className="leading-relaxed">
                    Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi khi bạn tạo tài khoản, cập nhật hồ sơ, tham gia các bài kiểm tra, tương tác với AI Tutor hoặc giao tiếp với người dùng khác trong cộng đồng. Thông tin này có thể bao gồm: họ tên, địa chỉ email, ảnh đại diện, trình độ tiếng Anh, mục tiêu h��c tập và sở thích.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">2. Sử dụng Thông tin</h2>
                  <p className="leading-relaxed mb-3">Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cung cấp, duy trì và cải thiện dịch vụ E-Learning.</li>
                    <li>Cá nhân hóa trải nghiệm học tập và gợi ý bài học phù hợp từ AI Tutor.</li>
                    <li>Kết nối bạn với những người học khác có cùng mục tiêu trong phần Cộng đồng.</li>
                    <li>Gửi các thông báo liên quan đến kỹ thuật, cập nhật hệ thống và tin nhắn bảo mật.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">3. Bảo vệ Dữ liệu</h2>
                  <p className="leading-relaxed">
                    Bảo mật của bạn là ưu tiên hàng đầu. Chúng tôi triển khai các biện pháp kỹ thuật và tổ chức nghiêm ngặt, bao gồm mã hóa dữ liệu, để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập, thay đổi hoặc phá hủy trái phép. Tuy nhiên, xin lưu ý rằng không có phương thức truyền tải nào qua Internet hoặc phương thức lưu trữ điện tử nào là an toàn 100%.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">4. Chia sẻ Thông tin</h2>
                  <p className="leading-relaxed">
                    Chúng tôi không bán, trao đổi hoặc cho thuê thông tin nhận dạng cá nhân của người dùng cho bên thứ ba. Chúng tôi chỉ có thể chia sẻ thông tin tổng hợp mang tính thống kê (không liên kết với bất kỳ thông tin nhận dạng cá nhân nào) với các đối tác tin cậy để phục vụ mục đích nghiên cứu và nâng cao chất lượng giáo dục.
                  </p>
                </section>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">1. Chấp nhận Điều khoản</h2>
                  <p className="leading-relaxed">
                    Bằng việc truy cập và sử dụng ứng dụng E-Learning này, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản Sử dụng này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, bạn có thể không được quyền truy cập Dịch vụ.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">2. Tài khoản Người dùng</h2>
                  <p className="leading-relaxed mb-3">Khi tạo tài khoản, bạn phải bảo đảm:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Thông tin cung cấp là chính xác, đầy đủ và cập nhật.</li>
                    <li>Bạn chịu trách nhiệm bảo mật mật khẩu và mọi hoạt động diễn ra dưới tài khoản của bạn.</li>
                    <li>Thông báo ngay cho chúng tôi nếu phát hiện bất kỳ việc sử dụng trái phép nào đối với tài khoản.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">3. Quy tắc Ứng xử Cộng đồng</h2>
                  <p className="leading-relaxed">
                    Phần "Cộng đồng" được tạo ra để kết nối và hỗ trợ việc học tập. Bạn đồng ý không sử dụng dịch vụ để: (a) Đăng tải nội dung xúc phạm, đe dọa, quấy rối hoặc vi phạm quyền riêng tư của người khác; (b) Phát tán thư rác (spam) hoặc tài liệu quảng cáo trái phép; (c) Cố tình phá hoại hoặc gây gián đoạn hệ thống. Vi phạm có thể dẫn đến việc khóa tài khoản vĩnh viễn.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">4. Gói Nâng cấp (Pro)</h2>
                  <p className="leading-relaxed">
                    Các gói "Nâng Cao" và "Cao Cấp" là các gói dịch vụ trả phí, thanh toán theo chu kỳ tháng. Phí đăng ký sẽ không được hoàn lại ngoại trừ những trường hợp được pháp luật hiện hành bắt buộc. Chúng tôi có quyền sửa đổi giá phí tại bất kỳ thời điểm nào và sẽ thông báo trước cho bạn trước khi chu kỳ thanh toán tiếp theo bắt đầu.
                  </p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-indigo-300 mb-4 border-b border-white/10 pb-2">5. Sở hữu Trí tuệ</h2>
                  <p className="leading-relaxed">
                    Tất cả nội dung, tính năng, và tính năng gốc (bao gồm thuật toán chấm điểm AI, kho đề thi, giao diện) đều thuộc quyền sở hữu độc quyền của E-Learning và các bên cấp phép của chúng tôi, được bảo hộ bởi luật bản quyền, nhãn hiệu và các luật sở hữu trí tuệ khác.
                  </p>
                </section>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
