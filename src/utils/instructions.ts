const KEY = 'instructionsSeen_v1';

export const hasSeenInstructions = (): boolean =>
    localStorage.getItem(KEY) === 'true';

export const markInstructionsSeen = (): void => 
    localStorage.setItem(KEY, 'true');