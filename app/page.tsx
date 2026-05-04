import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Học Tiếng Anh Thông Minh với AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Nền tảng học tiếng Anh toàn diện với từ điển thông minh, flashcards,
          IELTS mock tests, podcasts và AI tutor cá nhân hóa
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Bắt Đầu Miễn Phí
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Đăng Nhập
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tính Năng Nổi Bật</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dictionary */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Từ Điển Thông Minh</h3>
            <p className="text-gray-600">
              Tra cứu từ vựng với phát âm, ví dụ và lưu vào bộ sưu tập cá nhân
            </p>
          </div>

          {/* Flashcards */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-semibold mb-2">Flashcards Thông Minh</h3>
            <p className="text-gray-600">
              Học từ vựng hiệu quả với thuật toán spaced repetition
            </p>
          </div>

          {/* IELTS */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">IELTS Mock Tests</h3>
            <p className="text-gray-600">
              Luyện thi IELTS với đề thi thật và chấm điểm tự động
            </p>
          </div>

          {/* Podcasts */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-xl font-semibold mb-2">Podcasts Tương Tác</h3>
            <p className="text-gray-600">
              Nghe podcast với transcript và từ vựng được giải thích
            </p>
          </div>

          {/* Community */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Cộng Đồng Học Tập</h3>
            <p className="text-gray-600">
              Kết nối với người học khác, chia sẻ kinh nghiệm và động lực
            </p>
          </div>

          {/* AI Tutor */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Tutor Cá Nhân</h3>
            <p className="text-gray-600">
              Trợ lý AI giúp giải đáp thắc mắc và luyện tập hội thoại
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Bắt Đầu?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Tham gia cùng hàng nghìn người học tiếng Anh mỗi ngày
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Đăng Ký Ngay
        </Link>
      </section>
    </div>
  )
}
