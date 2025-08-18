import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>
								We'd love to hear from you! Whether you have feedback, questions, or suggestions, your thoughts are important to us. At Plant Species Identifier, we are always looking for ways to improve and make the experience more useful for our community.
							</p>
							<p>
								You can reach us anytime by email at <a href="mailto:mamtarani80035@gmail.com" className="underline text-blue-500 hover:text-blue-700">mamtarani80035@gmail.com</a>. We'll do our best to respond as quickly as possible.
							</p>
							<p>Thank you for supporting Plant Species Identifier — together, let’s keep exploring and discovering the beauty of plants around us!</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 