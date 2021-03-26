<?php

namespace App\Routes\Service;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\NoConfigurationException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RouterInterface;

class LegacyNonViewActionRedirectHandler extends LegacyRedirectHandler
{
    /**
     * @var RouteConverterInterface
     */
    private $routeConverter;
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * LegacyNonViewActionRedirectHandler constructor.
     * @param RouteConverterInterface $routeConverter
     * @param RouterInterface $router
     * @param String $legacyPath
     */
    public function __construct(RouteConverterInterface $routeConverter, RouterInterface $router, string $legacyPath)
    {
        parent::__construct($legacyPath);
        $this->routeConverter = $routeConverter;
        $this->router = $router;
    }

    /**
     * Check if the given $request is a non view api request
     *
     * @param Request $request
     * @return bool
     */
    public function isMatch(Request $request): bool
    {
        if ($this->routeConverter->isLegacyViewRoute($request)) {
            return false;
        }

        if ($this->routeConverter->isLegacyRoute($request)) {
            return true;
        }

        $isRegistered = true;
        try {
            $this->router->matchRequest($request);
        } catch (NoConfigurationException | ResourceNotFoundException | MethodNotAllowedException $e) {
            $isRegistered = false;
        }

        return !($isRegistered === true);
    }
}