import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { LogIn, Save, History } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLocale } from "../contexts/LocaleContext";

export default function SignInPrompt() {
  const { signInWithGoogle, loading } = useAuth();
  const { t } = useLocale();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Save className="h-5 w-5" />
          {t("signInPrompt.title")}
        </CardTitle>
        <CardDescription className="text-left">{t("signInPrompt.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-start w-full">
        <div className="flex text-left w-full justify-start gap-8">
          <div className="flex items-start gap-3">
            <History className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm">
                {t("signInPrompt.features.history")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("signInPrompt.features.historyDesc")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Save className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-sm">
                {t("signInPrompt.features.save")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("signInPrompt.features.saveDesc")}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full gap-2"
          size="sm"
        >
          <LogIn className="h-4 w-4" />
          {loading ? t("auth.signingIn") : t("auth.signInWithGoogle")}
        </Button>

        <p className="text-xs text-center mx-auto text-muted-foreground">
          {t("signInPrompt.continue")}
        </p>
      </CardContent>
    </Card>
  );
}
