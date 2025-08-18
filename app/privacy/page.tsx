import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/shared"

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<PageHeader title="Privacy Policy" />
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>
								We respect your privacy. Images you upload are used only to perform plant identification and are not stored longer than necessary for this purpose.
							</p>
							<p>
								We do not sell personal data. For questions, please contact us via the Contact page.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 