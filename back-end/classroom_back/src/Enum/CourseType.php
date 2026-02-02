<?php

namespace App\Enum;

enum CourseType: string
{
    case VIDEO = 'cours_video';
    case PDF = 'cours_pdf';

    public function getLabel(): string
    {
        return match ($this) {
            self::VIDEO => 'Vidéo',
            self::PDF => 'Document PDF',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::VIDEO => 'bi-play-circle-fill',
            self::PDF => 'bi-file-earmark-pdf-fill',
        };
    }
}
