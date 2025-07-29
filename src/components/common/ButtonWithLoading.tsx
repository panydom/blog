
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

const ButtonWithLoading = ({
    children,
    loading,
    onClick,
    ...props
}: {
    children: ReactNode;
    loading: boolean;
    onClick: (...props: never[]) => Promise<void>;
}) => {
    return (
        <Button {...props} onClick={onClick} disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : null}{children}
        </Button>
    );
};

export default ButtonWithLoading;