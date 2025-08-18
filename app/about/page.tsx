import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/shared"

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<PageHeader title="About" />
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>
								Plant Species Identifier helps you recognize plants instantly using AI. Upload a photo or capture one with your camera to discover species details in seconds.
							</p>
							<p>
								This project showcases a modern Next.js app using an elegant UI and mobile-friendly camera capture experience.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 