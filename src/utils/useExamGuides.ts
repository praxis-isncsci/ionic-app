import { ref, computed, nextTick } from 'vue';

export const useExamGuide = () => {
    const showModal = ref(false);

    const docHtml = ref('');

    const NATURAL_WIDTH = 1200;
    const scaleFactor = ref(0.7);
    const shiftX = ref(0);
    const scaledContainer = ref<HTMLElement | null>(null);
    const outerContainer = ref<HTMLElement | null>(null);
    const currentGuideName = ref<string>(''); 

    const openHelpDoc = async (docName: string, anchor?: string) => {
        currentGuideName.value = docName;
        showModal.value = true;
        await loadHtml(docName);
        await nextTick();

        if (anchor) {
            const anchorElem = scaledContainer.value?.querySelector('#' + anchor) as HTMLElement | null;
            if (anchorElem && outerContainer.value) {
            const offsetY = anchorElem.offsetTop; 

            outerContainer.value.scrollTo({
                top: offsetY * scaleFactor.value,
                behavior: 'smooth'
            });
            }
        }
    }

    const closeModal = () => {
        showModal.value = false;
    }

    async function loadHtml(docName: string) {
        try {
        const response = await fetch('assets/exam-guides/' + docName + '.html');
        let htmlText = await response.text();
        htmlText = htmlText.replace(/src="([^"]+)"/g, 'src="assets/exam-guides/$1"');
        docHtml.value = htmlText;
        } catch (err) {
        console.error('Error loading exam guide:', err);
        docHtml.value = '<p>Failed to load document.</p>';
        }
    }

    const adjustScale = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 400) {
        scaleFactor.value = 0.45;
        } else if (screenWidth < 500) {
        scaleFactor.value = 0.5;
        } else {
        scaleFactor.value = 0.7;
        }
        const scaledWidth = NATURAL_WIDTH * scaleFactor.value;
        shiftX.value = -0.04 * scaledWidth;
    }

    const scaledStyle = computed(() => ({
        transform: `translateX(${shiftX.value}px) scale(${scaleFactor.value})`,
        transformOrigin: 'top left',
        width: NATURAL_WIDTH + 'px',
        display: 'block'
    }));

    const setupResizeObserver = (el: HTMLElement) => {
        const resizeObserver = new ResizeObserver(() => {
        adjustScale();
        });
        resizeObserver.observe(el);
        return resizeObserver;
    }

    return {
        showModal,
        docHtml,
        openHelpDoc,
        closeModal,
        adjustScale,
        scaleFactor,
        shiftX,
        scaledStyle,
        setupResizeObserver,
        scaledContainer,
        outerContainer,
        currentGuideName
    };
}
